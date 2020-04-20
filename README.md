# wootlabtest

To run the project:

1. https://github.com/rusty-jnr/wootlabtest
2. Clone this repo
3. CD into the cloned Github repo folder `wootlabtest`
4. Run `npm install`
5. Run `npm start`

Issues and Constructive Feedback:

1) The login API is meant to return a response of successful or failed when the user hits the ednpoint, but it doesn't 
return a response which makes it practically impossible to show an error message or successful message to the user.
2) While adding to favourite with this end point `POST /favorite/add` I discovered that it also doesn't return a response
of success or failure. So is the same for removing from favorites and the method used in removing from favorites is
PUT which should be DELETE but all together it still functions.
3) The get details for user's favorite list `GET /favorite/detail/{id}` isn't neccessary because the `GET /detail/{id}` 
endpoint can serve the purpose of getting the details for a random selected movie and the user's favorite selected movie 
all it needs is the `id`
4) The two issues below were rectified when i pointed them out
   * A user could add a movie more than once to the his/her favotite list which shouldn't be possible.
   * I wasn't able to fecth from all the given endpoints because my access to fetch was blocked by CORS policy.