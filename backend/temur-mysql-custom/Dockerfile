FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=brainscandb

COPY brainscandb.sql /docker-entrypoint-initdb.d/
