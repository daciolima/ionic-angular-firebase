import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = []
  private colletionName : string = 'Task'

  constructor(private dbfire : AngularFirestore) { }

  public getTask() : Task[] {
    return this.tasks
  }

  public addTask(title: string, description: string, date: string) {
    console.log(title)
    let task : Task;
    if(date != ''){
      date = date.replace("-", "/");
      task = {
        title: title,
        description: description,
        date: new Date(date),
        done: false
      }
      this.addToFirestore(task);
    } else {
      task = {
        title: title,
        description: description,
        done: false
      }
      this.addToFirestore(task);
    }
  }

  public updateTask(id: string, title: string, description: string, date: string, done: boolean) {
    let task : Task;
    if(date != ''){
      date = date.replace("-", "/");
      task = {
        title: title,
        description: description,
        date: new Date(date),
        done: done
      }
      this.updateOnFirestore(id, task);
    } else {
      task = {
        title: title,
        description: description,
        done: done
      }
      this.updateOnFirestore(id, task)
    }
  }

  public updateTaskDone(id: string, task: Task) {
    task.done = !task.done;
    this.updateOnFirestore(id, task)
  }

  public delTask(index: number) {
    this.tasks.splice(index, 1);
    this.setTaskLocalStorage()
  }


  // Storage de Task
  async setTaskLocalStorage() {
    await Preferences.set(
      {
        key: 'task',
        value: JSON.stringify(this.tasks)
      }
    )
  }

  // CRUD Firestore
  public addToFirestore(record: Task) {
    return this.dbfire.collection(this.colletionName).add(record)
  }

  public getFromFirestore() {
    return this.dbfire.collection(this.colletionName).valueChanges({idField: 'id'})
  }

  public updateOnFirestore(recordId: string, record: Task) {
    this.dbfire.doc(this.colletionName + '/' + recordId).update(record)
  }

  public deleteeOnFirestore(recordId: string) {
    this.dbfire.doc(this.colletionName + '/' + recordId).delete()
  }

}

interface Task {
  title: string;
  description: string;
  date?: Date;
  done: boolean;
}
