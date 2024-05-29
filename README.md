# Holidaze

***

This app is a holiday-themed resort website. The way the app works and the commands needed to run it are noted bellow.

## Getting started

These instructions will help you clone the project and run it.

### Git clone
```
git clone https://github.com/AkselBF/holidaze.git
```

### Run project
```
npm run dev
```

***

## Navigation

Here's a list of the pages the app contains:

- Home
- Venues
- Hotel (Venues/id)
- Booking
- Success
- Login/Register/Profile

Let's go over what each pages are about and what you can do in each of them.

***

### Home

This is the introductory page, welcoming the user to the app. This is supposed to capture the theme of holidays, venues and so on, to make the user understand what this is about. There are a few features the home page shows:
1. An automatic hero slider
2. A responsive carousel the user can interact with
3. The corresponding venues from the carousel
4. A description of the app
5. A button leading to the venues page

*** 

### Venues

The venues page shows all made venues. This page also posesses quite a few features:
1. Different filter methods that can be used at the same time
2. A search bar
3. Pagination to better separate the venues

All venues can be accessed. Clicking on a venue leads to the Hotel page

***

### Hotel

The hotel page is the page representing the specific venue selected by the user. Here, the user can see the many details the venue has. This page also leads to the Booking page, where the user books the selected venue, however, the user must be logged in which is where the Button comes in to either navigate the user to the next page or display a login modal to log the user in then navigate the user to the booking page.

*** 

### Booking

The booking page is where the user books the selected venue, and decides the amounnt of guests coming and the amount of time they are staying. 
The amount of guests cannot surpass the maximum amount of guests for the selected venue and the dates booked by another user cannot be taken by another. 
Once the the guest and date inputs are filled, the user must type in the card info to be able to progress. Once successful, the user is redirected to the success page. 

*** 

### Success 

This page is simply an informative page saying the user has successfully booked the selected venue. There is a button along with the message leading the user back to the home page.

***

### Login/Profile

This page usually starts of as the login page where the user can choose between the lofin form and the registration form. Once registered, the user is lead to the Login page, where they must log in. If successful, the user is lead to the profile page. 
The profile page is where the user can see all of his user information and bookings. But if the user registers as a venue manager, the user can also create, edit, delete and view the bookings of the venue they created.
In total, the features if the user registers as venue manager is:
1. Avatar: The user can change their avatar image if the image address is valid
2. Bookings: This is where all bookings the user has made are dislayed
3. Venues: See all venues you have made and an 'add venue' button at the top of the section. Hovering over them presents three options: Edit, Delete, Bookings
4. Logout button: Leads back to the login form. Must Login again to gain access to the app's key features

*** 