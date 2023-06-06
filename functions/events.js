const events = async (client) => {
    // client.on('message_revoke_everyone', async (after, before) => {
    //     // Fired whenever a message is deleted by anyone (including you)
    //     console.log(after); // message after it was deleted.
    //     if (before) {
    //         console.log(before); // message before it was deleted.
    //     }
    // });

    // client.on('message_revoke_me', async (msg) => {
    //     // Fired whenever a message is only deleted in your own view.
    //     console.log(msg.body); // message before it was deleted.
    // });

    // client.on('message_ack', (msg, ack) => {
    //     /*
    //         == ACK VALUES ==
    //         ACK_ERROR: -1
    //         ACK_PENDING: 0
    //         ACK_SERVER: 1
    //         ACK_DEVICE: 2
    //         ACK_READ: 3
    //         ACK_PLAYED: 4
    //     */
    
    //     if (ack == 3) {
    //         // The message was read
    //     }
    // });

    client.on('group_join', (notification) => {
        // User has joined or been added to the group.
        // console.log('join', notification);
        // notification.reply('User joined.');
    });
    
    client.on('group_leave', (notification) => {
        // User has left or been kicked from the group.
        // console.log('leave', notification);
        // notification.reply('User left.');
    });
    
    // client.on('group_update', (notification) => {
    //     // Group picture, subject or description has been updated.
    //     console.log('update', notification);
    // });
    
    client.on('change_state', state => {
        console.log('CHANGE STATE', state);
    });

    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
    });

    client.on('group_admin_changed', (notification) => {
        if (notification.type === 'promote') {
            /** 
              * Emitted when a current user is promoted to an admin.
              * {@link notification.author} is a user who performs the action of promoting/demoting the current user.
              */
            console.log(`You were promoted by ${notification.author}`);
        } else if (notification.type === 'demote')
            /** Emitted when a current user is demoted to a regular user. */
            console.log(`You were demoted by ${notification.author}`);
    });
}

module.exports = {
    events: events
}