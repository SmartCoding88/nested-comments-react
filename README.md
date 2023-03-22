<h1>Nested Comments React and Node</h1>
<p>Follow these steps to reproduce the project</p>
<h2>The Server</h2>
<ol>
    <li>npm init -y</li>
    <li>npm i --save-dev prisma nodemon</li>
    <li>npm i @prisma/client</li>
    <li>npx prisma init</li>
    <li>Fill in prisma->prisma.prisma file with models and run the following command to generate the tables in DB: <br>
        <pre>npx prisma generate</pre>
    </li>
    <li>
    <p>Create a file "seed.js" inside prisma folder</p>
    <p>Add the following section to package.json</p>
    <pre>
    "type": "module",
    "prisma": {
        "seed": "node prisma/seed.js"
    }
    </pre>
    <p>RUN: npx prisma db seed</p>
    </li>
    <li>We will use<b> FASTIFY</b>  instead of Express since it is simpler for creating APIs <br/>
    > npm i fastify dotenv @fastify/cookie @fastify/cors @fastify/sensible
    </li>
</ol>
<h2>The Client</h2>
<p>Follow these steps to reproduce the project</p>
<ol>
<li>CD into the client folder and run npx create-react-app . to create a new React application</li>
<li>Install axios: npm i axios</li>
<li>npm i react-router-dom react-icons</li>
</ol>