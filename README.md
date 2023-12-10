## Projeto Ionic 6 e Angular 16

Projeto Ionic 6 com Angula 16 que mostra um exemplo de App Task com OAuth2 Social Login pelo Firebase e Storage no Firestore.


**Iniciando projeto Ionic**
```shell
ionic start <nomeProjeto> <template> --type=angular --capacitor
```

**CLI Ionic**
```shell
ionic g
ionic --help
```

#### Recursos Nativos - Capacitor - https://capacitorjs.com/
**Verificação**
```shell 
ionic integrations enable capacitor
```
**Camera**
```shell
npm install @capacitor/camera
npx cap sync

npm install @ionic/pwa-elements  # Configurá-lo no arquivo main.ts
```
**Local Storage**
```shell
npm install @capacitor/preferences
npx cap sync
```
**Firestore**
```shell
npm install firebase @angular/fire
```
**Firebase auth**
```shell
npm install --save capacitor-firebase-auth
```

**Build da app Ionic**
```shell
# Prepadando os arquivos
ionic build
```

**Build Android**
```shell
# Build para android
ionic capacitor add android

# Abrir a aplicação buildada no emulador android
ionic capacitor run android

# Outro comando de update após alguma modificação de ajuste
ionic cap copy android
```

**Build Ios**
```shell
# Build para ios
ionic capacitor add ios

# Abrir a aplicação buildada no emulador ios
ionic capacitor run ios

# Outro comando de update após alguma modificação de ajuste
ionic cap copy ios
```
