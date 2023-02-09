FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5000

ARG SQLCONNECTION
ARG MONGOCONNECTION
ARG STRIPEAPIKEY
ARG OPENAIAPIKEY
ARG JWTSECRET

ENV CONNECTIONSTRINGS__SQLCONNECTION=${SQLCONNECTION}
ENV CONNECTIONSTRINGS__MONGOCONNECTION=${MONGOCONNECTION}
ENV STRIPE__APIKEY=${STRIPEAPIKEY}
ENV OPENAI__APIKEY=${OPENAIAPIKEY}
ENV SECRETS__JWTSECRET=${JWTSECRET}

RUN echo 'Postgres connection string: ${SQLCONNECTION}'
RUN echo 'Mongo connection string: ${MONGOCONNECTION}'
RUN echo 'Stripe API key: ${STRIPEAPIKEY}'
RUN echo 'OpenAI API key: ${OPENAIAPIKEY}'
RUN echo 'JWT secret: ${JWTSECRET}'

ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /
COPY *.sln ./
COPY src/CopyZillaBackend.API/CopyZillaBackend.API.csproj src/CopyZillaBackend.API/
COPY src/CopyZillaBackend.Application/CopyZillaBackend.Application.csproj src/CopyZillaBackend.Application/
COPY src/CopyZillaBackend.Domain/CopyZillaBackend.Domain.csproj src/CopyZillaBackend.Domain/
COPY src/CopyZillaBackend.Infrastructure/CopyZillaBackend.Infrastructure.csproj src/CopyZillaBackend.Infrastructure/
COPY src/CopyZillaBackend.Persistence/CopyZillaBackend.Persistence.csproj src/CopyZillaBackend.Persistence/
COPY tests/API.Tests/API.Tests.csproj tests/API.Tests/

RUN dotnet restore
COPY . .
WORKDIR /src/CopyZillaBackend.API
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CopyZillaBackend.API.dll"]