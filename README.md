# Introduction
first of all i really fell in love with the idea of the task to create something to track your expenses and income throught the month and to give you a summary overview at the end of each month to know what specifically takes most of your expenses so i didn't make an app on the go but i concentrated on each detail to give you an excellent output and to give you an idea about my way of thinking and implementation of code

# project architecture
usually i use MVVM architecture while building my apps so we can consider (screens, components, UI) folders as the view layer, (hooks folder) as the view model layer and (redux and services folders) as model layer, and this helps me a lot specially if we wanted to create a web app we'll use the data and view models layers in the web app and with writing some html and css code we'll get a new web app that is very similar to the mobile app with the least effort

# Folder structure:
- **assets**: which is a container for all the images, videos, fonts and other resources that will be used throught the application
- **Screens**: it contains the main screens of my apps, usually the app is devided into modules (like auth module, profile module, ...etc) and each module contains some screens
- **components**: each screen is devided into multiple components to ensure readibility of code and better debuggin and to implement the most important programming concept single responsibility, so we can treat it as the building blocks of the screen
- **hooks**: it contains the most of the app logic and it handles the data from/to the model layer
- **navigatino**: it holds the setup for different navigation stacks and the side drawer or bottom navigator content
- **translation**: it holds the setup for multi-language app like the translation folders and i18n-next setup
- **types**: it contains the different types for the entities used throughout the app
- **store**: the redux setup and reducers
- **services**: it holds the urls of the api calls beside the setup of the api consumer in the client side like axios of useQuery
- **utils**: it holds the pure functions that will be used throughout the application

# How i created the task:
- actually i'm not ashamed of telling you that AI helped me a lot in creating this task and it saved me a log of time as AI nowadays became A reality that cannot be ignored and everyone must know how to exploit it to implement ordinary and traditional tasks like creating the UI or deviding each screen to smaller components just to save the time for more important tasks and to ensure better productivity and faster development time

- and of course AI can't create everything, so you have to intervene and make your edits to ensure that everything is under control and we have strong solutions that helped me a lot like chatgpt pro and cursor editor and i plan to give a chance to sonnet and claude solutions because of its well-known reputation nowadays

- most of the UI folder i've taken from other projects (copy paste) because these components i use most of the time because of its flexibility and efficiency

- you will notice that i create each react-native element in the UI folder and import it in my screens and components from there which gives me the ability to add global logic over all the elements throught my app instead of targeting them one by one so imagine the scenario that we want to add some prop to all Text elements in my app like allowFontScalling={false} without these shared elements in the UI you will loop literally over all the text elements in your app which will be a nightmare to any developer and will cause a lot of conflicts in git so instead i've created shared UI elements guarantee the best controll over my app and to ease the modifications on them in the future

- also gathering all react-native elements in UI folder and re-use them helps me in theming scenarios and in handling RTL in arabic lang as i don't use I18n.forceRTL instead i pass any style to a function which will revert the design based on the input you will find this setup in details in my [template](https://github.com/matthewadel/react-native-template-starter)
