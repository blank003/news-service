# News-Service

The News-Service is a Node.js application that acts as an intermediary between your application and the GNews API. It provides caching, validation, and a user-friendly Swagger documentation interface.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Key](#api-key)
  - [Swagger Documentation](#swagger-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up and run the News API Proxy Service locally.


### Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/) (optional but recommended)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/blank003/news-service.git

## Usage

Run npm install to install all the dependencies from package.json

### API KEY

1. You can either add the key in the swagger UI directly or you need to add it to the config.js file and uncomment code in newsApi.js

Run node app.js to start the local server on port 3000 URL: http://localhost:3000

### Swagger Documentation

- The swagger should be accessible on the following URL: http://localhost:3000/api-docs

## Testing

- npm test 
