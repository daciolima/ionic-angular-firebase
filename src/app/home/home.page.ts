import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, PopoverController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { PopoverComponent } from '../popover/popover.component';
import { CameraService } from '../services/camera.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  type: string = "peding";

  // Observable é usado para dados assíncronos
  public tasks: Observable<any[]>;

  constructor(private alertController: AlertController,
    public taskService: TaskService,
    public toastController: ToastController,
    public popoverController: PopoverController,
    public cameraService: CameraService,
    public storageService: StorageService,
    public actionSheetController: ActionSheetController)
    {
      storageService.setTimerLocalStorage();
    }


  ngOnInit() {
    // get firestore
    this.tasks = this.taskService.getFromFirestore();
  }

  async presentActionSheet(i: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'O que deseja fazer?',
      buttons: [{
        text: 'Deletar',
        icon: 'trash',
        handler: () => {
          this.cameraService.deletePhoto(i)
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    })
    await actionSheet.present();
  }

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar tarefa',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          role: 'confirm',
          handler: (alertData: any) => {
            if(alertData.title !== "" && alertData.description !== "" && alertData.date !== "") {
              this.taskService.addTask(
                alertData.title,
                alertData.description,
                alertData.date
              )
            } else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          }
        }
      ],
      inputs: [
        {
          name: 'title',
          placeholder: 'Nome da tarefa. (Até 30 caracteres)',
          attributes: {
            maxlength: 30,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da tarefa',
        },
        {
          name: 'date',
          type: 'date',
          min:'1980-01-01',
          max:'2100-12-31',
        }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptDel(id: string) {
    const alert = await this.alertController.create({
      header: 'Excluir tarefa',
      backdropDismiss: false,
      message: "Deseja realmente excluir a tarefa?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          role: 'confirm',
          cssClass: 'pclinic',
          handler: () => this.taskService.deleteeOnFirestore(id)
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptUpdate(id: string, task: any) {
    const alert = await this.alertController.create({
      header: 'Atualizar tarefa',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          role: 'confirm',
          cssClass: 'pclinic',
          handler: (alertData: any) => {
            if(alertData.title != '' && alertData.description != '' && alertData.date != '') {
              this.taskService.updateTask(
                id,
                alertData.title,
                alertData.description,
                alertData.date,
                task.done
              )
            } else {
              this.presentToast();
              this.presentAlertPromptUpdate(id, task)
            }
          }
        }
      ],
      inputs: [
        {
          name: 'title',
          placeholder: 'Nome da tarefa. (Até 30 caracteres)',
          attributes: {
            maxlength: 30,
          },
          value: task.title
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da tarefa',
          value: task.description
        },
        {
          name: 'date',
          type: 'date',
          min:'1980-01-01',
          max:'2100-12-31',
          value:
          task.date ?
            task.date.toDate().getFullYear() +
            '-' +
            ((task.date.toDate().getMonth() + 1) < 10 ? "0" + task.date.toDate().getMonth() + 1 : task.date.toDate().getMonth()+ 1) +
            "-"
            + ((task.date.toDate().getDay() + 1) < 10 ? "0" + task.date.toDate().getDay() : task.date.toDate().getDay())
            : ""
        }
      ],
    });

    await alert.present();
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: "Não pode existir campos em branco",
      duration: 4000,
      animated: true,
      position: 'bottom',
      icon: 'alert-circle-outline'
    });
    toast.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    })
    return await popover.present()
  }
}
