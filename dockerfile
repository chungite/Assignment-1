FROM maven:3.8.4-openjdk-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/calculator-0.0.1-SNAPSHOT.jar /app/calculator.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/calculator.jar"]