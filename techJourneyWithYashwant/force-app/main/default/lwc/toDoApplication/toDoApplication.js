import { LightningElement, wire } from "lwc";
import TASK_OBJECT from "@salesforce/schema/Task_Manager__c";
import TASK_ID from "@salesforce/schema/Task_Manager__c.Id";
import TASK_NAME from "@salesforce/schema/Task_Manager__c.Name";
import TASK_ISCOMPLETE_FIELD from "@salesforce/schema/Task_Manager__c.is_Completed__c";
import TASK_DATE_FIELD from "@salesforce/schema/Task_Manager__c.Task_Date__c";
import TASK_COMPLETED_DATE_FIELD from "@salesforce/schema/Task_Manager__c.Completed_Date__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import {
  createRecord,
  deleteRecord,
  updateRecord
} from "lightning/uiRecordApi";
import getAllIncompleteTasks from "@salesforce/apex/ToDoApplicationController.getAllIncompleteTasks";
import getAllCompletedTasks from "@salesforce/apex/ToDoApplicationController.getAllCompletedTasks";
import { refreshApex } from "@salesforce/apex";

export default class ToDoApplication extends LightningElement {
  taskname = "";
  taskdate = null;
  incompletedTask = [];
  completedTask = [];
  incompleteTaskResult = [];
  completedTaskResult = [];

  @wire(getAllIncompleteTasks) wiredIncompleteTasks(result) {
    this.incompleteTaskResult = result;
    let { data, error } = result;
    if (data) {
      this.incompletedTask = data.map((currItem) => ({
        taskname: currItem.Name,
        taskdate: currItem.Task_Date__c,
        isComplete: currItem.is_Completed__c,
        taskId: currItem.Id,
        completedTask: currItem.Completed_Date__c
      }));
      console.log("Incomplete task", this.incompletedTask);
    } else if (error) {
      console.log("Error occured while fetching incomplete task", error);
    }
  }

  @wire(getAllCompletedTasks) wiredCompleteTasks(result) {
    this.completedTaskResult = result;
    let { data, error } = result;
    if (data) {
      this.completedTask = data.map((currItem) => ({
        taskname: currItem.Name,
        taskdate: currItem.Task_Date__c,
        isComplete: currItem.is_Completed__c,
        taskId: currItem.Id
      }));
      console.log("Incomplete task", this.completedTask);
    } else if (error) {
      console.log("Error occured while fetching completedTask task", error);
    }
  }

  changeHandler(event) {
    let { name, value } = event.target;
    if (name === "taskname") {
      this.taskname = value;
    } else if (name === "taskdate") {
      this.taskdate = value;
    }
  }

  resetTaskHandler(event) {
    this.taskname = "";
    this.taskdate = null;
  }

  async addTaskHandler(event) {
    if (!this.taskdate) {
      this.taskdate = new Date().toISOString().slice(0, 10);
    }
    if (this.isValidate()) {
      let inputField = {};
      inputField[TASK_NAME.fieldApiName] = this.taskname;
      inputField[TASK_DATE_FIELD.fieldApiName] = this.taskdate;
      inputField[TASK_ISCOMPLETE_FIELD.fieldApiName] = false;
      let recordInput = {
        apiName: TASK_OBJECT.objectApiName,
        fields: inputField
      };
      try {
        await createRecord(recordInput);
        this.showToastNofity("Success", "Task Created Successfully", "success");
        this.resetTaskHandler();
        await refreshApex(this.incompleteTaskResult);
      } catch (error) {
        console.log("Record Creation Failed", error);
      }
      // this.incompletedTask = [
      //   ...this.incompletedTask,
      //   {
      //     taskname: this.taskname,
      //     taskdate: this.taskdate
      //   }
      // ];
      // console.log("incompletedTask", this.incompletedTask);
      // this.resetTaskHandler();
      // let sortedIncompletedTask = this.sortTask(this.incompletedTask);
      // this.incompletedTask = [...sortedIncompletedTask];
      // console.log("sortedIncompletedTask", this.incompletedTask);
    }
  }

  isValidate() {
    let isValid = true;
    let element = this.template.querySelector(".taskname");

    if (!this.taskname) {
      isValid = false;
    } else {
      let taskItem = this.incompletedTask.find(
        (currItem) =>
          currItem.taskname === this.taskname &&
          currItem.taskdate === this.taskdate
      );
      if (taskItem) {
        isValid = false;
        element.setCustomValidity(
          "Task already exists with same name and date"
        );
      }
    }
    if (isValid) {
      element.setCustomValidity("");
    }
    element.reportValidity();
    return isValid;
  }

  sortTask(inputArr) {
    let sortedArray = inputArr.sort((a, b) => {
      let dateA = new Date(a.taskdate);
      let dateB = new Date(b.taskdate);
      return dateA - dateB;
    });
    return sortedArray;
  }

  async removalTaskHandler(event) {
    let taskId = event.target.name;
    try {
      await deleteRecord(taskId);
      this.showToastNofity("DELETE", "Task Deleted Successfully", "success");
      await refreshApex(this.incompleteTaskResult);
    } catch (error) {
      console.log("Record Deletion Failed.", error);
    }
    // this.incompletedTask.splice(index, 1);
    // let sortedIncompletedTask = this.sortTask(this.incompletedTask);
    // this.incompletedTask = [...sortedIncompletedTask];
    // console.log("sortedIncompletedTask", this.incompletedTask);
  }

  completeTaskHandler(event) {
    let taskId = event.target.name;
    this.refreshData(taskId);
  }

  dragStartHandler(event) {
    event.dataTransfer.setData("index", event.target.dataset.item);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  dropElementHandler(event) {
    let taskId = event.dataTransfer.getData("index");
    this.refreshData(taskId);
  }

  async refreshData(taskId) {
    try {
      let inputField = {};
      inputField[TASK_ID.fieldApiName] = taskId;
      inputField[TASK_ISCOMPLETE_FIELD.fieldApiName] = true;
      inputField[TASK_COMPLETED_DATE_FIELD.fieldApiName] = new Date()
        .toISOString()
        .slice(0, 10);
      let recordInput = {
        fields: inputField
      };
      await updateRecord(recordInput);
      this.showToastNofity("UPDATE", "Task Updated Successfully", "success");
      await refreshApex(this.incompleteTaskResult);
      await refreshApex(this.completedTaskResult);
    } catch (error) {
      console.log("Record Update Failed.", error);
    }

    // let removedItem = this.incompletedTask.splice(index, 1);
    // this.completedTask = [...this.completedTask, removedItem[0]];
    // console.log("this.completedTask", this.completedTask);
    // let sortedIncompletedTask = this.sortTask(this.incompletedTask);
    // this.incompletedTask = [...sortedIncompletedTask];
    // console.log("sortedIncompletedTask", this.incompletedTask);
  }

  showToastNofity(title, message, variant) {
    const showEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(showEvent);
  }
}
