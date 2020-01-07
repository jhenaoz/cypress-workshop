# Workshop Cypress

!Bienvenido! El objetivo de este taller es desarrollar los conocimientos necesarios para automatizar pruebas de interfaz gráfica (UI) usando [Cypress](https://www.cypress.io/). Mediante el desarrollo de varios ejercicios prácticos, se abarcará todo lo que necesitas para desarrollar un proyecto de automatización de forma exitosa. Durante el desarrollo de los ejercicios, se explicará cómo preparar un proyecto para un proceso de integración continúa con [Travis CI](https://travis-ci.com/) el adecuado uso de [Github](https://github.com/) y [Gitflow](https://guides.github.com/introduction/flow/) para la entrega de un producto de software.

Para realizar este taller se espera que el estudiante tenga buenos conocimientos en:

* Git (Puede seguir este [enlace](https://services.github.com/on-demand/downloads/es_ES/github-git-cheat-sheet/) con los comandos más utilizados en git)

## Steps

### Tabla de Contenido

1. [Configuración Inicial del Proyecto](#1-configuración-inicial-del-proyecto)
2. [Agregar Integración Continua](#2-agregar-integración-continua)
3. [Agregando Análisis de Código Estático](#3-agregando-análisis-de-código-estático)
4. [Depurando El Código](#4-depurando-el-código)
5. [CSS Selector](#5-css-selector)
6. [Page Object Model](#6-page-object-model)
7. [Mejorando los Locator](#7-mejorando-los-locator)
8. [Separar prueba en diferentes describes](#8-separar-prueba-en-diferentes-describes)
9. [Listas de Elementos, filtros y elementos dentro de elementos](#9-listas-de-elementos-filtros-y-elementos-dentro-de-elementos)
10. [Más Locators](#10-más-locators)
11. [Component Testing](#11-component-testing)
12. [Agregando Mocha Awesome](#12-agregando-mocha-awesome)
13. [Ejecución de Código Javascript](#20-ejecución-de-código-javascript)
14. [Trabajando con IFrames](#21-trabajando-con-iframes)
15. [Subiendo un Archivo](#22-subiendo-un-archivo)
16. [Descargando Archivos](#23-descargando-archivos)

### 1. Configuración Inicial del Proyecto

**Descripción**: Se configurará inicialmente el proyecto con [TypeScript](https://www.typescriptlang.org/) y se hará una prueba sobre la página de [Google](https://www.google.com/). Adicionalmente se creará la configuración necesaria básica para un repositorio de [Github](https://help.github.com/)

**Nota:** Si no tiene conocimiento sobre Github se le recomienda realizar las [Guias de Github](https://guides.github.com/activities/hello-world/) o el lab de [Introduction to Github](https://lab.github.com/githubtraining/introduction-to-github)

1. Crear una cuenta en Github si no la tiene.
1. Crear un repositorio en limpio dentro de la página de GitHub con el nombre de “**cypress-workshop**”
1. Crear una carpeta en su computador llamada `cypress-workshop` y ubicarse en ella en una consola
1. Seguir las instrucciones para realizar el primer commit (use las que aparece en lá página de github)

    ``` shell
    echo "# cypress-workshop" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git remote add origin git@github.com:<su-usuario>/cypress-workshop.git
    git push -u origin master
    ```

1. En la configuración del repositorio de GitHub en la opción Branches proteja la rama Master indicando que los PR requieran revisión antes de mergear y que requiera la comprobación del estado antes de hacer merge
1. Dentro del menú colaboradores agregar a:
   * [jhenaoz](https://github.com/jhenaoz)
   * [manuelam20](https://github.com/manuelam20)

1. [Instalar NodeJS](https://nodejs.org/es/download/package-manager/) en su equipo si no lo tiene instalado
1. Crear una rama **project-setup** en el repositorio
    ``` bash
    git checkout -b project-setup
    ```
1. Crear el archivo .editorconfig a raíz del proyecto con la siguiente información
    ```properties
    root = true

    [*]
    indent_style = space
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = true
    indent_size = 2

    [*.md]
    indent_size = 4
    trim_trailing_whitespace = false
    ```
1. Instalar la extensión de Visual Studio Code `EditorConfig for VS Code` (Generalmente requiere reinicio del IDE)
1. Ejecutar en una consola `npm init` dentro de la ruta donde se encuentra el repositorio y colocar la siguiente información:

   | Parametro          | Valor |
   | ------------------ | ---------- |
   | **Name**           | workshop-cypress                           |
   | **Version**        | _[Por Defecto]_                               |
   | **Description**    | This is a Workshop about Cypress           |
   | **Entry Point**    | _[Por Defecto]_                               |
   | **Test Command**   | `cypress run`        |
   | **Git Repository** | _[Por Defecto]_                               |
   | **Keywords**       | ui-testing, dojo, practice, cypress        |
   | **Author**         | _[Su nombre]_ <_[Su correo]_> (_[su github]_) |
   | **License**        | MIT                                           |

1. Instalar la dependencia de cypress
  `npm install cypress`

1. Instalar las dependencias de desarrollo de typescript
  `npm i --save-dev typescript`

1. crear una archivo llamado cypress.json en la raiz del proyecto con el siguiente contenido
    ``` json
        {
            
        }
    ```
1. crear una carpeta en la raiz del proyecto llamada cypress
  `mkdir cypress`

1. Crea dentro de la carpeta cypress el archivo tsconfig.json con el siguiente contenido
    ``` json
    {
        "compilerOptions": {
            "strict": true,
            "baseUrl": "../node_modules",
            "target": "es5",
            "lib": ["es5", "dom"],
            "types": ["cypress"]
        },
        "include": [
            "**/*.ts"
        ]
    }
    ```

1. Crear la carpeta **cypress/integration** y dentro de la carpeta crear el archivo **google.test.ts**

   ``` ts
        describe('This is the first example of cypress', () => {
            it('should have a title', () => {
                cy.visit('https://www.google.com/');
                cy.title().should('be.equal', 'Google');
            });
        });
   ```

1. Crear el archivo **.gitignore** en la raíz del proyecto, el gitignore deberia ignorar la subida de archivos autogenerados y las librerias en el repositorio de codigo.

    ``` yml
    ### Ignore for NodeJs
    node_modules

    ### Ignore for cypress
    cypress/videos
    cypress/screenshots

    ### Ignore for VsCode
    .vscode
    ```
1. ejecute el siguiente comando:
    ```bash
    npm i webpack ts-loader @cypress/webpack-preprocessor
    ```
1. Cypress se ejecuta dentro del navegador entonces todos nuestros archivos de typescript tienen que quedar en un bundle (compilados y con source maps para poder realizar debug), agrege el siguiente contenido a este archivo **cypress/plugins/indexjs**
    ``` javascript
    const wp = require('@cypress/webpack-preprocessor')

    module.exports = (on) => {
    const options = {
        webpackOptions: require('../../webpack.config'),
    }
    on('file:preprocessor', wp(options))
    }
    ```
1. cree el archivo **webpack.config.js** en la raiz del proyecto con el siguiente contenido:
    ```javascript
    module.exports = {
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
        {
            test: /\.ts$/,
            exclude: [/node_modules/],
            use: [{
            loader: 'ts-loader',
            }],
        },
        ],
    },
    }
    ```
1. Crear el archivo **LICENSE** en la raíz del proyecto con lo especificado en <https://en.wikipedia.org/wiki/MIT_License> (_Tenga en cuanta cambiar el año y el copyright holders_)
1. Crear la carpeta a nivel de raíz llamada **.github** y dentro de ella crear el archivo **CODEOWNERS** con el siguiente contenido
    ``` bash
    * @jhenaoz
    ```
1. Realizar un commit donde incluya los archivos modificados con el mensaje “setup cypress configuration” y subir los cambios al repositorio
    ```bash
    git add .
    git commit -m "setup cypress configuration"
    git push origin project-setup
    ```
1. Crear un PR, asignarle los revisores y esperar por la aprobación o comentarios de los revisores. Si no sabe como realizarlo siga las siguientes [instrucciones](https://help.github.com/articles/creating-a-pull-request/)
1. Una vez aprobado realizar el merge a master seleccionando la opción “squash and merge”

### 2. Agregar Integración Continua

**Descripción**: La integración continua es una práctica requerida hoy en día, en esta sesión configuraremos travis para ejecutar nuestra integración continua

1. Crear el archivo **.nvmrc** en la raíz del proyecto con el contenido `v10.10.0`
1. Crear el archivo **.travis.yml** en la raíz del proyecto
1. Agregar el siguiente contenido
    ``` yml
    dist: trusty
    addons:
      chrome: stable
    language: node_js
    cache:
      directories:
        - "node_modules"
    ```
1. Habilitar Travis en el repositorio <https://docs.travis-ci.com/user/getting-started/>
1. Subir los cambios a github (no cree aún el PR)
1. Ir a la url de [Configuración de Travis](https://travis-ci.com/account/repositories)
1. Habilite la configuración GitHub Apps
1. Cree un PR
1. Verificar que la ejecución en Travis termine correctamente

### 3. Agregando Análisis de Código Estático

**Descripción**: El análisis de código estático nos ayuda a estandarizar la forma en como escribimos código, en esta sesión configuraremos tslint con airbnb para tener análisis de código estático

1. Agregar las dependencias de desarrollo **tslint** y **tslint-config-airbnb**
``` bash
    npm install --save-dev tslint tslint-config-airbnb  
```
2. Crear el archivo **tslint.json** en la raíz con la siguientes información
``` json
{
    "defaultSeverity": "error",
    "extends": [
    "tslint-config-airbnb"
    ],
    "rules": {
    "trailing-comma": [true]
    }
}
```
3. Agregar el script de **package.json** lint
``` json
    "scripts" {
        "lint": "tslint --project cypress/tsconfig.json cypress/**/*.ts"
    }
```

4. Corregir las reglas de forma automática `npm run lint -- --fix`
5. Las reglas que no se puedan corregir automáticamente investigue y corrijalas. Ejecute el comando `npm run lint` para verificar que reglas esta rompiendo
6. Para agregar esas verificaciones a la integracion continua las podemos ejecutar en paralelo usando stages en travis-ci, agrege una nueva para realizar verificacion de codigo estatico.

``` yml
jobs:
  inlcude:
    - stage: test
      script: npm test
```
deberia quedar con un archivo asi:

``` yml
jobs:
  inlcude:
    - stage: lint
      script: npm run lint
    - stage: test
      script: npm test
```
1. Solicite la revisión de código tal como se hizo en el punto anterior

**NOTA:** se recomienda instalar la extensión `TSLint` de vs code

### 4. Depurando El Código

**Descripción**: La depuración nos ayudará a identificar y corregir las parte del código que estén presentando fallas, así como poder tener una mayor entendimiento de las valores de las variables en tiempo de ejecución. Para activar el debugger en `vs code`:

1. Modifique el archivo google.test.ts y agrege la palabra debugger;
    ``` ts
        describe('This is the first example of cypress', () => {
            it('should have a title', () => {
                cy.visit('https://www.google.com/');
                debugger; // NEW CONTENT!
                cy.title().should('be.equal', 'Google');
            });
        });
    ```
1. Agrege el script open al package.json
``` json
    {
        "scripts": {
            "open": "cypress open"
        }
    }
```
1. Ejecute el comando `npm run open`
1. Cuando ejecute la prueba abra el inspector de chrome y vuelva a lanzar la prueba.
![CypressEditor](https://user-images.githubusercontent.com/2055110/56171067-92e36a80-5fa9-11e9-9271-1685d0ce4cc8.png)
![CypressDebugMode](https://user-images.githubusercontent.com/2055110/56171241-2c128100-5faa-11e9-8570-808a4c60aabb.png)
1. Envíe un pull request con una captura de pantalla en la que se identifique fue posible hacer depuración del test `google.spec.ts`
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 5. CSS Selector

**Descripción**: Los css selector son los selectores más utilizados por los desarrolladores, tener un buen dominio de ellos facilita la automatización de pruebas. En esta sesión se implementará un primer caso de pruebas con css selectores

1. Crear el archivo **buy-tshirt.spec.ts** dentro de la carpeta **cypress/integration**
1. Escribir dentro del archivo el siguiente contenido
    ``` ts
    describe('Buy a t-shirt', () => {
        it('Then should be bought a t-shirt', () => {
            cy.visit('http://automationpractice.com/');
            cy.get('#block_top_menu > ul > li:nth-child(3) > a').click();
            cy.get('#center_column a.button.ajax_add_to_cart_button.btn.btn-default').click();
            cy.get('[style*="display: block;"] .button-container > a').click();
            cy.get('.cart_navigation span').click();
            cy.get('#email').type('aperdomobo@gmail.com');
            cy.get('#passwd').type('WorkshopProtractor');
            cy.get('#SubmitLogin > span').click();

            cy.get('#center_column > form > p > button > span').click();
            cy.get('#cgv').click();
            cy.get('#form > p > button > span').click();
            cy.get('#HOOK_PAYMENT > div:nth-child(1) > div > p > a').click();
            cy.get('#cart_navigation > button > span').click();
            cy.get('#center_column > div > p > strong')
            .should('have.text', 'Your order on My Store is complete.');
        });
    });
    ```
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators. Para ejecutar cypress en modo headless use el siguiente comando:

    ```bash
        npx cypress run
    ```

1. Solicite la revisión de código tal como se hizo en el punto anterior


### 6. Page Object Model

**Descripción**: El page object model es el patrón por defecto que se utiliza para la mantenibilidad de las pruebas, conocer cómo implementar este patrón le ahorrará muchas horas de reproceso en el futuro. En esta sesión se hará la primera implementación del patrón Page Object Model (POM)

1. Crear la carpeta **cypress/page** desde la raíz del proyecto
1. Crear el archivo **cypress/page/menu-content.page.ts** con el siguiente contenido
    ``` ts
    export class MenuContentPage {
        private tShirtMenuSelector: string;

        constructor () {
            this.tShirtMenuSelector = '#block_top_menu > ul > li:nth-child(3) > a';
        }

        public goToTShirtMenu() {
            cy.get(this.tShirtMenuSelector).click();
        }
    }
    ```
1. Crear el archivo **cypress/page/index.ts** con el siguiente contenido
    ``` ts
    export { MenuContentPage } from './menu-content.page';
    ```
1. Modificar el archivo **buy-tshirt.spec.ts** de la siguiente forma
    * Importar la dependencia del page object
      ``` ts
      import { MenuContentPage } from '../page';
      ```
    * Creando una instancia del objeto `MenuContentPage`
      ``` ts
      describe('Buy a t-shirt', () => {
      const menuContentPage: MenuContentPage = new MenuContentPage();
      ```
    * Modificando el locator que le da clic en el menú de t-shirt
      ``` ts
      cy.visit('http://automationpractice.com/');
      menuContentPage.goToTShirtMenu();
      ```
1. Realice el resto de page object y remplacelo en la prueba, los nombres de los page object son:  **address-step.page.ts**, **bank-payment.page.ts**, **order-summary.page.ts**, **payment-step.page.ts**, **product-added-modal.page.ts**, **product-list.page.ts**, **shipping-step.page.ts**, **sign-in-step.page.ts**, **summary-step.page.ts**
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 7. Mejorando los Locator

**Descripción**: En esta sesión usted hará la propuesta de que locators deberían ser utilizados en la prueba que se está implementado.

1. Haga su propia propuesta de locators para cada uno de los page-objects
1. Enviar PR con los cambios
1. El revisor comentará con los que no está de acuerdo, en ese caso, justifique la razón de su selección (No use **XPATH**)


### 8. Separar prueba en diferentes describes

**Descripción**: Por legibilidad es bueno tener sesionados cada uno de los pasos de las pruebas en diferentes describes, en esta sesión usted aprenderá cómo hacerlo

1. Modificar la prueba de **buy-tshirt.spec.ts** de tal forma que tenga varios describes de la siguiente forma
    * Abrir la página en el navegador
    * Proceso de compra de la Camiseta
    * Logeo en la aplicación
    * Seleccionar la dirección por defecto
    * Pago en el banco (Este debe contener el `it` de validación)
1. Enviar PR con los cambios

### 9. Listas de Elementos, filtros y elementos dentro de elementos

**Descripción**: En muchas ocasiones tenemos que obtener un locator para posteriormente poder hacer una acción sobre un hermano o alguno que no esté directamente relacionado, en esta sesión trabajaremos con la anidación de locators y métodos de búsqueda para poder conseguir relacionar dos locators

1. Agregar una variable privada dentro de **product-list.page.ts** llamado `products` el cual obtendrá todos los productos
1. Cree el método privado `findByProduct` el cual debe retornar toda la caja del producto con el nombre específico. Utilice `cy.get` para obtener un elemento,`find`, para encontrar elementos internos y  `contains` para filtrar la lista y `first` para obtener el primer elemento. Revise la [API de cypress](https://docs.cypress.io/api/api/table-of-contents.html) por si tiene alguna duda
1. Elimine el método que antes obtenía el primer elemento y cambielo por un método llamado `selectProduct` que reciba el nombre del producto y le da clic en la imagen
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 10. Más Locators

**Descripción**: En esta sesión automatizaremos otra página diferente, y su misión es seleccionar los mejores locators posibles de tal forma que el page object sea lo más reutilizable posible

1. Crear el archivo **personal-information.page.ts** en la carpeta cypress/page
1. Crear el archivo **locators.spec.ts** en la carpeta de cypress/integration, dentro de este archivo se navegará a <http://toolsqa.com/automation-practice-form/> y ejecutará el siguiente método que debe llenar el formulario con la información que se indica y dar clic en el botón Button (Evitar el uso de css locators)
    ``` ts
    await personalInformationPage.fillForm({
       firstName: 'Alejandro',
       lastName: 'Perdomo',
       sex: 'Male',
       experience: 7,
       profession: ['Automation Tester'],
       tools: ['Selenium Webdriver'],
       continent: 'South America',
       commands: [
         'Browser Commands',
         'Navigation Commands',
         'Switch Commands',
         'Wait Commands',
         'WebElement Commands']
    });
    ```
1. Realizar una comprobación del título "**Practice Automation Form**"

### 10.1. Errores no controlados
**Descripción**: La página indicada en el ejercicio anterior tiene un error no controlado, lo que provoca que el script de Cypress falle. Los errores no controlados en una página pueden provocar comportamientos inesperados y Cypress nos proporciona un método para manejarlos. [Catalog of Events](https://docs.cypress.io/api/events/catalog-of-events.html#Uncaught-Exceptions)

1. Agregue al archivo cypress/support/index.js el siguiente contenido:
```ts
Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
})
```
### 11. Component Testing
**Descripción**: Los sitios web tienen muchas dependencias, en especial del backend, tiempos de respuesta altos, servicios no implementados y comportamientos y flujos que no podemos probar, por lo cual cypress nos da la facilidad de interceptar los llamados http y devolver una respuesta esperada y controlada.
1. Agrege un archivo, **cypress/fixtures/google-response.txt** con el siguiente contenido:

```txt
)]}'
[[["Cypress\u003cb\u003e",35,[39,19],{"du":"/complete/deleteitems?client\u003dpsy-ab\u0026delq\u003dcypress+filter\u0026deltok\u003dAKtL3uReaVKfGBEK2JuXIexuw9_M-w0exA","zf":27}],["text to assert\u003cb\u003e",0]],{"q":"7XAO32BLxtd7HmlwPy5zROp9uuk"}]
```
1. Modifique el test case de google , **google.spec.ts**
    ```ts
        describe('This is the first example of cypress', () => {
            it('should have a title', () => {
                cy.server();
                cy.fixture('google-response').as('googleSearchResponse');
                cy.route('GET', '**/complete/search**', '@googleSearchResponse');

                cy.visit('https://www.google.com/');
                cy.get('[name="q"]')
                .type('Cypress');

                cy.title().should('be.equal', 'Google');
            });
        });
    ```
1. Ejecute las pruebas de nuevo y deberia ver en el test runner de cypress las llamadas http marcadas como STUB.
![component-testing](https://user-images.githubusercontent.com/2055110/58178317-984c6880-7c6b-11e9-8fcd-c4588b7bd213.png)

1. Agrege verificaciones adicionales, como que la peticion http fue llamada con el valor de la prueba **Cypress** y que fue llamada varias veces.

1. Solicite la revisión de código tal como se hizo en el punto anterior

### 12. Agregando Mocha Awesome

**Descripción**: agregaremos un reporte visual a nuestro proyecto de tal forma que tenga un reporte html de la ejecución de las pruebas

1. Instalar la dependencia de desarrollo **mochawesome**
	```bash
        npm install --save mocha@5 marge mochawesome mochawesome-merge
	```
1. modifique el archivo **cypress.json**
	```json
        {
        "reporter": "mochawesome",
            "reporterOptions": {
                "overwrite": false,
                "html": false,
                "json": true
            }
        }
	```
1. Modificar el script test del **package.json** de la siguiente forma:
	```json
        "test": "cypress run && mochawesome-merge --reportDir mochawesome-report > mochawesome-report/output.json && marge mochawesome-report/output.json",
	```
1. Modificar el gitignore para que excluya la carpeta **mochawesome-report**
1. Modificar el package.json para que se borre la carpeta **mochawesome-report** antes de cada ejecucion de las pruebas.
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless.
1. Solicite la revisión de código tal como se hizo en el punto anterior y adjunte un pantallazo del reporte generado.


WIP >>>>>>>>>>>>>>>>>>

### 20. Ejecución de Código Javascript

**Descripción**: Selenium tiene algunas limiaciones y por tanto en ocasiones nos toca ejecutar código directamente en javascript para poder hacer una acción que necesitamos, en este sesión cambiaremos una propiedad de un locator por medio de javascript ya que selenium no es capaz de soportarlo nativamente.

1. Cree el archivo de prueba **i-frame.spec.ts** el cual abrirá la página <http://toolsqa.com/iframe-practice-page/> modificará la áltura del IFrame 1, posteriormente obtendrá la nueva altura para comprobar si efectivamente cambio
1. Cree el archivo page **i-frame.page.ts** el cual contendrá un método para modificar la altura de un IFrame y otro para obtener su altura
	``` ts
	import { $, browser, ElementFinder, promise } from 'protractor';
	
	...
	
	public setFormFrameHeight(height: number): promise.Promise<void> {
		return browser.executeScript(`arguments[0].height = ${height};`, this.iframe1);
	}
	```

### 21. Trabajando con IFrames

**Descripción**: Los IFrames aunque ya están mandados a recoger, en ocasiones no los encontramos en algunas páginas, y no está de más saber cómo trabajar con ellos cuando nos los encontremos. En esta sesión entraremos a un iframe, haremos acciones sobre el, saldremos de él y haremos otras acciones sobre la página principal

1. Modificar el page **i-frame.page.ts** de tal forma que publique:
    * un método que retorne el título de la página de valor **Sample Iframe page**
    * un método para pasarse al iframe 1
	``` ts
	public async switchToFrame(): Promise<void> {
		await browser.switchTo().frame(this.frame.getWebElement());
	}
	```
    * otro método para regresar al contexto principal
	``` ts
	public async switchToMainPage(): Promise<void> {
		await browser.switchTo().defaultContent();
	}
	```
1. Modificar la prueba **i-frame.spec.ts** de tal forma que verifique el título principal
1. Modificar la prueba **i-frame.spec.ts** de tal forma que se cambie al iframe 1 y verifique el título
1. Modificar la prueba **i-frame.spec.ts** de tal forma que se cambie al contexto principal y verifique nuevamente el título

### 22. Subiendo un Archivo

**Descripción**: En esta sesión se automatizará una prueba donde se deba subir un archivo.

1. Modificar el page **personal-information.page.ts** de tal forma que el método `fillForm` ahora no haga clic en el botón y cree otro método submit que llene el formulario y haga clic en el botón
1. También debe recibir dentro del json un parámetro file que tiene la ruta relativa de algún archivo a subir, si tiene un valor válido debe subir el archivo
1. Cree la carpeta resources a nivel de la raíz del proyecto y coloque un archivo jpg en ella
1. Modificar **locators.spec.ts** de tal forma que se le pase la ruta de la imagen que puso en resources
1. Agregue una validación el **locators.spec.ts** que verifique la imagen fue cargada

### 23. Descargando Archivos

**Descripción**: En esta sesión se automatizará una prueba donde se deba descargar un archivo

1. Modificar el page **personal-information.page.ts** de tal forma que si recibe el parámetro `downloadFile` dentro del JSON llame al método privado `download` de ese mismo pageobject
1. El método `download` obtendrá el link del enlace "**Test File to Download**" y se lo pasará al método `downloadFile` que recibe dos parametros de entrada el link de descarga y el nombre del archivo con que se quiere guardar
1. Crear la carpeta **service** dentro de **src** y crear dentro un archivo llamado **download.service.ts** que tendrá dos métodos públicos
    ``` ts
    public async downloadFile(link: string, filename): Promise<void>
    ```
    Este método obtendrá la información del link y lo guardará en una carpeta temp a nivel raíz del proyecto con el nombre indicado
    ``` ts
    public readFileFromTemp(filename: string): Buffer
    ```
    Recibirá el nombre del archivo y devolverá el buffer que contiene la información del archivo
1. Modificar la prueba de tal forma que descargue el archivo y después comprobar que descargó de forma correcta
