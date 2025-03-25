String jobId=Database.executeBatch(new CustomIterableBatch(),2);
System.debug('jobId'+jobId);