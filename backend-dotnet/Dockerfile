FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["WeatherBackend.csproj", "./"]
RUN dotnet restore "WeatherBackend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "WeatherBackend.csproj" -c Release -o /app/build
RUN dotnet publish "WeatherBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "WeatherBackend.dll"]
