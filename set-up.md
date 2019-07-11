# Set-up instructions

You will find below a list of instructions to set-up the project, especially the UI task (hospital-fe). These are purely indicative and if you already have a way of setting up, you can safely ignore these instructions. The only requirements are to use TypeScript and CSS preprocessors.

## Base

If it is not already done, install node on your machine :
https://nodejs.org/en/
We recommend using the LTS version.

Node comes with npm as package manager, however the instruction are provided with yarn, so we advise you install it as well :
https://classic.yarnpkg.com/en/docs/install/

We also recommend git to clone the project :
https://git-scm.com/downloads

You can also download the project as an archive on the "Downloads" left menu of bitbucket.

### If you are on windows :

Check that the path is updated correctly (press windows key, type 'path', and open the system menu to modify environment variables).
In System Variables / User variables, look for the "Path" line, click on 'Modify' and check that both node and npm (and yarn) are present.
If you are using yarn, make sure that global packages will be available through the command line as well. Add the result of the command `yarn global bin` to the path.

The usual locations are as follow :

| Program       |                                     Path |
| ------------- | ---------------------------------------: |
| Node          |               `C:\Program Files\nodejs\` |
| npm           |     `C\Users\{Name}\AppData\Roaming\npm` |
| yarn          |        `C:\Program Files (x86)\Yarn\bin` |
| yarn packages | `C:\Users\{Name}\AppData\Local\Yarn\bin` |

You can then proceed by cloning / downloading the project. Below you will find instructions as to how to set-up the UI part for both Vue.js and Angular.

### For Unix based OS

Your path should be updated automatically, if one command does not work, make sure that it is correct.

## hospital-fe set-up

### For Vue.js :

The simplest way to bootstrap a project for Vue is to use `Vue CLI`. It is an utilitary program that provides you with command line tools to perform various Vue projects related tasks.

To install it, run in your command line
`yarn global add @vue/cli`

The `vue` command should now be available. If not, check that your environment variables are correctly set, and start a new console.
Now, head to the project directory with your command line, remove the "hospital-fe" folder, and run `vue create hospital-fe`.
You will be asked a bunch of questions as for how to set-up the project.

- Manually select features
  - Choose Vue version
  - babel
  - **Typescript**
  - **CSS Pre-processors**
  - Linter / Formatter (optional, it will perform some coding style checks)
- Choose a vue version -> 2 or 3, it does not matter for us
- use class-style component syntax? `y`
- use babel alongside typescript ? `y`
- pick a CSS preprocessor -> `Sass/SCSS with node-sass`
- (pick a linter -> `ESLint with error prevention only`)
- (uncheck linting options)
- Where to place configuration ? `In dedicated config files`
- Pick the package manager -> `Use Yarn` (if you installed it)

The CLI will then proceed to generate your project tree with required modules.
You can then `cd` to `hospital-fe` and run `yarn serve` to launch a local server serving your application, hot reload included.

### For Angular :

Similarly to Vue.js the simplest way to bootstrap a project is to use the official [Angular CLI.](https://angular.io/guide/setup-local#install-the-angular-cli)

To install it, run in your command line
`yarn global add @angular/cli`

After that, you can check that the cli is correctly installed by doing `ng --version`, it should displayed the version of the cli.

Now, head to the project directory with your command line, remove the "hospital-fe" folder, and run `ng new hospital-fe`.
You will be asked a bunch of questions as for how to set-up the project.

- Strict mode: **yes**
- Add Angular routing: **no**
- Which stylesheet format: **SCSS**

The CLI will then proceed to generate your project tree with required modules.
You can then `cd` to `hospital-fe` and run `yarn start` to launch a local server serving your application, hot reload included.
