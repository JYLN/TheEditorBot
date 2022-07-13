# The Editor
This is a small Discord bot created for a specific server.

## Changelog: v1.0
### Events
> - **Ready** - *Added* - Logs that the bot is ready.
> - **Error** - *Added* - Logs if an error occurs; allows errors to be handled without pausing the application.
> - **Message** - *Added* - Listens for emitted message events and responds with valid commands.
> - **Role Update** - *Added* - Listens for emitted role update events and ensures that role names created by the bot cannot be changed as the current structure of the color command creates roles based off member's usernames.
### Commands
> - **Ping** - *Added* - Test command that members can run to ensure the bot is online; responds with the WebSocket latency.
> - **Color** - *Added* - Command that members can run to change the color of their name; bot creates a role named after the user and then updates the role's color to the argument given to the bot. Bot ensures this is the member's highest role so that the color that is chosen will be visible as their custom color.

## Changelog: v1.1
> - Migrated from previous Discord.JS version to Discord.JS v13

## Changelog: v2.0
> - Client and commands were updated to support slash command feature as Discord.JS v13 supports this feature. Regular commands using the mention prefix will likely be deprecated in future versions.

## Changelog: v3.0
### Events
> - **Role Update** - *Updated* 
>   - Re-factored due to change of naming structure for custom color roles created by the bot.
>   - Updated to check if the role updated is a custom color role created by the bot, rather than utilizing logic for all roles.
> - **Interaction Create** - *Updated* 
>   - Re-factored due to removal of message commands using mention prefix.
>   - Now listens for auto-complete interactions due to addition of auto-complete in `color` command.
### Commands
> - Removed message commands using mention prefix as well as associated config settings, command handlers, etc. in favor of slash commands.
> - **Color** - *Updated* 
>   - Custom color roles created by the bot no longer rely on using the member's username, as the API does not actively track changes in Discord usernames.
>     - Roles now rely on the first 5 digits of the member's user ID, prepended by string 'Custom Color'.
>     - *This may be reverted to using Discord usernames depending on if I want to incorporate a database for the bot.*
>   - Auto-complete has been enabled for the `color` argument to provide easy selection of recognized color strings if not inputting HTML hexadecimal color.
> - ** Ping ** - *Updated*
>   - Updated description of the slash command to be more concise about its function.
### Other
> - Re-factored console logging utility as previous version was reusing multiple lines of code, and was built as class but not utilizing class instances or constructor method.
