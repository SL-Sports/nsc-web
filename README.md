# NSC Web

The NSC Web App is a dashboard for athlete and coach management, built for administrators of the National Sports Council of Sri Lanka and various Sri Lankan sporting associations. The web app is built in React and uses a backend API built with Express.js, which connects to the MongoDB database. 

Built by [@anudaweerasinghe](https://github.com/anudaweerasinghe), [@sparrownor1](https://github.com/sparrownor1), [@addykan](https://github.com/addykan), and [@raaidrt](https://github.com/raaidrt). 

To run a local version of the app in your own browser, run `npm run start` in terminal. Unfortunately, authentication is required to access the app. 

# File Structure

The app is separated into multiple modules, separated by folders in `/src/components`. The main pages are the dashboard home page, activities, payments, and profiles. 

# Modules

## Dashboard Home Page
This page is visible to NSC admins only, who can click through to each association to view the association's dashboard. Sports and associations are independently tracked to allow for multiple associations under one sport. 
![Dashboard home page - only visible to NSC Admins](https://media.discordapp.net/attachments/600111845268914179/860591886128644126/unknown.png)


## Association Home Page
On the association home page, both NSC admins and association admins can get an overview of recent payment requests as well as profiles. 
![Golf Association Home Page example](https://media.discordapp.net/attachments/600111845268914179/860592696938987520/unknown.png)

## Profiles Module
The Profiles module allows admins to view information about athletes and coaches, across all associations. This information is accessible by the general public through the API endpoint.  
![Profiles home page](https://media.discordapp.net/attachments/600111845268914179/860593551645605888/unknown.png)

The profile details page allows admins to view publicly available information such as names, locations, and associated profiles (such as a coach). They can also view information about the user's recent activities, rankings, and payments. 
![Profile details page](https://media.discordapp.net/attachments/600111845268914179/860618736217358386/unknown.png)

Admins are also able to make changes to rankings and profile information directly from this page: 
![Ranking edit page](https://media.discordapp.net/attachments/600111845268914179/860619596813959268/unknown.png)
![Profile edit page](https://media.discordapp.net/attachments/600111845268914179/860620061760552980/unknown.png)

## Payments Module
The payments module allows admins to track, create, edit, and approve payments to athletes and coaches. Only NSC Admins are permitted to create new payments. 
![Payments home page](https://media.discordapp.net/attachments/600111845268914179/860620831477727232/unknown.png)

The details page shows more information about the specific payment, allowing NSC admins and association admins to add comments and track paycheck information. Alongside payment details, admins can also see activity history for the user. 
![Payment details page](https://media.discordapp.net/attachments/600111845268914179/860623461231886406/unknown.png)
Admins can also add, edit, and delete payment details. 
![Payment edit page](https://media.discordapp.net/attachments/600111845268914179/860630702914535494/unknown.png)

## Rankings Module
The rankings module supports multiple ranking types, and admins can easily add new players to the ranking list. 
![Rankings Page](https://media.discordapp.net/attachments/600111845268914179/860631506883969044/unknown.png)

## Activities Module
The activity details page is accessible from any activity card across the entire app, and shows information about a specific activity. Athletes, coaches, and all admins can add comments and media to the activity, which can be approved by coaches and associations. 
Below is an example of a fully approved activity:
![Approved activity details page example](https://media.discordapp.net/attachments/600111845268914179/860636034411790356/unknown.png)
And an example of an unapproved activity: 
![Unapproved activity details example](https://media.discordapp.net/attachments/600111845268914179/860637044652769300/unknown.png)
