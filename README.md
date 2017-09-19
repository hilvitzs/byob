# README

### BYOB (deployed to: https://sh-byob.herokuapp.com)

Build Your Own Backend required that we create a backend and migrate and seed the information into those databases. We had to get our own data and seed the databases with that information.

I have two tables for the project. One titled 'wines' that holds information about wines. Their names, max price, and min price. The second is called 'attributes' for the attributes of those wines and is connected to the first table through foreign keys.

Here are the paths for the 4 GET requests:

- Get all wines:
	- /api/v1/wines

- Get a specific wine:
	- /api/v1/wines/:id

- Get all attributes:
	- /api/v1/attributes

- Get a specific attribute:
	- /api/v1/attributes/:id

Here are the POST requests (which require authentication):

- Post to wines:
	- /api/v1/wines
	- required in the body is an object: {
	name: "",
	max_price: int;
	min_price: int;
	}

- Post to attributes:
	- /api/v1/attributes
	- required in the body is an object: {
	attribute: "",
	Image_URL: "",
	wines_id: int;
	}

Here are the PATCH requests (which require authentication):

- Patch to wines:
	- /api/v1/wines/:id
	- required in the body is an object: {
		wineskeytochange: "",
	  }

- Patch to attributes:
	- /api/v1/attributes/:id
	- required in the body is an object: {
		attributeskeytochange: "",
	  }

Here are the DELETE requests:

- Delete from wines:
	- /api/v1/wines/:id

- Delete from attributes:
	- /api/v1/attributes/:id


	
