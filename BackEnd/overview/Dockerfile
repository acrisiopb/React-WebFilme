FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: imagem de execução da aplicação
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
WORKDIR /app

# Copia o JAR do build anterior
COPY --from=builder /app/target/overview-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando para rodar o JAR
ENTRYPOINT ["java", "-jar", "app.jar"]