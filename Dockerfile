# Usa la imagen de SQL Server
FROM mcr.microsoft.com/mssql/server:2019-latest

USER root

# Instala gnupg, sqlcmd y otras herramientas necesarias de SQL Server
RUN apt-get update && \
    apt-get install -y gnupg curl apt-transport-https && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools && \
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Añade el PATH de las herramientas de SQL Server al entorno
ENV PATH=$PATH:/opt/mssql-tools/bin

# Copia el archivo de inicialización de la base de datos al contenedor



# Configura las variables de entorno requeridas por SQL Server
ENV ACCEPT_EULA=Y
# ENV SA_PASSWORD=Nfoque3893  # Asegúrate de reemplazar esto con una contraseña segura

# Ejecuta SQL Server, espera a que inicie y luego ejecuta el script init.sql para crear la base de datos
CMD /opt/mssql/bin/sqlservr & \
    sleep 15 && \
    wait