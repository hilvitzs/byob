# BYOB Submission Form

[Project Spec](http://frontend.turing.io/projects/build-your-own-backend.html)

------

# Basics

#### Link to the Github Repository for the Project
[BYOB](https://github.com/hilvitzs/byob)

#### Link to the Deployed Application
[Heroku](https://sh-byob.herokuapp.com/)


## Completion

#### Were you able to complete the base functionality?

* Documented all available endpoints and their usage in the README?

Yes

* Seeded a database with at least 2 tables and 1 relationship?

Yes

* Had at least 10 endpoints that returned responses with appropriate status codes?

Yes

* Secured at least 4 endpoints with JWTs?

Yes

* Enforced a linter and wrote code that conformed to it?

Yes

* Wrote tests for both happy and sad paths for each endpoint?

No - I tested most happy and sad paths but for some I wasn't entirely sure how to get an error.

* Setup automatic deployments with CircleCI to a production app on Heroku?

Yes

# Code Quality

#### Link to a specific block of your code on Github that you are proud of
[happy code]()

* Why were you proud of this piece of code?

I'm actually really proud of the entire project. I really wasn't understanding the concepts we've covered and although this project was a struggle, especially with CircleCI and Heroku (since this was the first time I did that), I am very happy that I got most things to work and have a pretty thorough understanding of what's going on.

#### Link to a specific block of your code on Github that you feel not great about
[sad code](https://github.com/hilvitzs/byob/blob/master/server.js#L104-L116)

* Why do you feel not awesome about the code? What challenges did you face trying to write/refactor it?

While I think that this will work for one query, I was confused as to how to extend that to multiple query parameters. I was happy that I thought of the object.keys and checking to see if they're there and using that for the select(), but I know that it's not completely functional and could be written better.

#### Attach a screenshot or paste the output from your terminal of the result of your test-suite running.

[test suite](./successfultestsuite.png)

#### Attach a screenshot or paste the output from your terminal of the result of your linter running.

[linter output](./linter.png)

#### Attach a screenshot of your CircleCI build passing

[circleCI build](./succesfulbuild.png)

-----

#### Please feel free to ask any other questions or make any other statements below!

I am feeling a lot better about everything with this project, as well as with the extra Jet Fuel practice. I know that I could have done a little bit more testing but just understanding the basics of everything that I'm doing is a great, new feeling.

-----


# Instructor Feedback (Instructor Name)

The following set of points are distributed at the discretion of the instructor.

### Documentation

**x points**: Lorem ipsum dolor set amet

### Feature Completion

**x points**: Lorem ipsum dolor set amet

### Testing & Linting & Error Handling

**x points**: Lorem ipsum dolor set amet

### JavaScript Style

**x points**: Lorem ipsum dolor set amet


## Project is worth 150 points

## To get a 3 on this project, you need to score 110 points or higher
## To get a 4 on this project, you need to score 130 points or higher

# Final Score: x / 150
