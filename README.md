# Inventory system

## Description

Inventory management system developed in Java, MySQL and React. The system allows to keep track of items, stock, purchases, sales, suppliers and customers registered in the system, as well as the users that make use of the inventory.


## Tech Stack

- **Database**
  - Engine: [MySQL Community 8.0](https://dev.mysql.com/downloads/installer/)
  - Command line tool: [MySQL Workbench 8.0 CE](https://dev.mysql.com/downloads/workbench/)

- **Backend**
  - Java - [JDK 17](https://www.oracle.com/co/java/technologies/downloads/#jdk17-windows)
  - Spring Boot 3.1.3
  - Maven 4.0.0
  - IDE: [IntelliJ IDEA Community Edition 2023.2.2](https://www.jetbrains.com/idea/download/?section=windows)

- **Frontend**
  - [Node ^18.10.0](https://nodejs.org/en/download)
  - React 18.2.0


## Installation

- **Database**

  Open MySQL Workbench and create or select an instance. Then, Open a tab to run queries from the top bar, first option (Create a new SQL tab).
  
  Copy and paste the code found in the file [`database.sql`](https://github.com/felipevcc/inventory-system/blob/main/Database/tables/database.sql) and run it.
  
  And finally, copy and paste the code of each of the files that are located in the [`Database/procedures/`](https://github.com/felipevcc/inventory-system/tree/main/Database/procedures) directory and execute them.

- **Backend**

  First, from the editor (IntelliJ IDEA) open the project [`Backend/`](https://github.com/felipevcc/inventory-system/tree/main/Backend). The editor will start configuring and installing the project.

  Once everything is configured and installed, go to the file [`BackendApplication.java`](https://github.com/felipevcc/inventory-system/blob/main/Backend/src/main/java/com/inventorysystem/Backend/BackendApplication.java) and press the run button in the top bar.

- **Frontend**

  Locate yourself in the directory [`Frontend/`](https://github.com/felipevcc/inventory-system/tree/main/Frontend)

  Once inside, run the following command to install the dependencies:

  ```bash	
  npm install
  ```

  Once the dependencies are installed, run the following command to start the application:

  ```bash
  npm start
  ```


## User manual

[Link to the pdf](https://drive.google.com/file/d/1ByyZlX8UeTJyYoFnptIqHSrQvmqoDhcf/view?usp=sharing) of the user manual, which explains how to use the application.


## Author

Felipe Villamizar <a href="https://github.com/felipevcc" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>

> Project developed during the studies of software analysis and development technology at SENA
