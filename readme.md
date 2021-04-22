# The Editor
This is a small Discord bot created for a specific server.

## Changelog: v1.0
### Events
> **Ready** - *Added* - Logs that the bot is ready\
> **Error** - *Added* - Logs if an error occurs; allows errors to be handled without pausing the application\
> **Message** - *Added* - Listens for emitted message events and responds with valid commands\
> **Role Update** - *Added* - Listens for emitted role update events and ensures that role names created by the bot cannot be changed as the current structure of the color command creates roles based off member's usernames
### Commands
> **Ping** - *Added* - Test command that members can run to ensure the bot is online; responds with the WebSocket latency\
> **Color** - *Added* - Command that members can run to change the color of their name; bot creates a role named after the user that runs the command and then updates the color to the argument given to the bot. Bot ensures this is the member's highest role so that the color that is chosen by be seen
