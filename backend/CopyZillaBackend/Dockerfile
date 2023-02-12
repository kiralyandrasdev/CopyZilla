FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5000

ARG SQLCONNECTION
ARG MONGOCONNECTION
ARG STRIPEAPIKEY
ARG OPENAIAPIKEY
ARG JWTSECRET
ARG AZURELOGSTORAGECONNECTION

ENV CONNECTIONSTRINGS__SQLCONNECTION=${SQLCONNECTION}
ENV CONNECTIONSTRINGS__MONGOCONNECTION=${MONGOCONNECTION}
ENV CONNECTIONSTRINGS__AZURELOGSTORAGECONNECTION=${AZURELOGSTORAGECONNECTION}
ENV STRIPE__APIKEY=${STRIPEAPIKEY}
ENV OPENAI__APIKEY=${OPENAIAPIKEY}
ENV SECRETS__JWTSECRET=${JWTSECRET}

RUN echo ${SQLCONNECTION}
RUN echo ${MONGOCONNECTION}
RUN echo ${AZURELOGSTORAGECONNECTION}
RUN echo ${STRIPEAPIKEY}
RUN echo ${OPENAIAPIKEY}
RUN echo ${JWTSECRET}

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

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