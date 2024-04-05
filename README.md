# destination-certification-INC


**Frontend Structure: A Brief Overview**

**destination-certification-INC** folder from my project directly corresponds to the assignment requirements. Let's delve into the details:

1. **Main Component: destination-home**
     - This component is stand alone and is **lazy-loaded**.
     - Within **destination-home**, there's a child component called **table**, which loads immediately.
     - **destination-home** includes two other lazy-loaded components: **add-component** and **search-component**
     - These components load dynamically when the user clicks the plus or search icon within the table.

2. **Animations with GSP**
    - I've employed **GSP (GreenSock Animation Platform)** for animations.

3. **Service Organization**
   - Services are thoughtfully divided for ease of testing.
   - We've structured them to facilitate the implementation of new features and reusability.
   - Notably, some services that aren't immediately required are **lazy-loaded on demand**.

4. **Data Management**
   - Data from the database is stored in local storage.
   - We manage this data using the **StateManagementService**.
   - TokenInterceptor
The TokenInterceptor is an Angular HTTP interceptor that enhances outgoing HTTP requests. Its primary responsibilities include:

5. **Token Injection:**
   - When a request is made, the interceptor checks if a user token exists in the local storage.
   - If a token is found, it injects it into the request headers as an Authorization bearer token.
   - Error Handling: The interceptor captures any HTTP errors (such as 401 or 403 status codes).

6. **Separation of Concerns**
   - The services API and local storage are intentionally separated.
   - This design allows us to introduce additional features (such as websockets) independently and with ease.

In conclusion, this assignment has been crafted with the intention of enabling straightforward feature implementation and efficient service reuse. 


**Backend Overview:** 
A Node.js Server with Next.js
Our backend is powered by a Node.js server that runs the Next.js dist. Here are the key components:

1. **Routes:**

- **Login:** Handles user authentication.

- **Update**: Allows modification of existing data.

- **Delete:** Removes records from our system.

- **Add:** Adds new data entries.

**Middleware:**

- **dotenv:** For managing environment variables.

- **jsonwebtoken:** Facilitates secure token-based authentication.

- **NextCors:** Enables Cross-Origin Resource Sharing (CORS) for seamless communication with our frontend.

In summary, our backend architecture is designed for efficiency, security, and seamless integration with our Angular frontend.

