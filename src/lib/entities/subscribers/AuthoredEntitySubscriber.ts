import type { Session } from "@supabase/supabase-js";
import { EventSubscriber, type EntitySubscriberInterface, type UpdateEvent } from "typeorm";
import { AuthoredEntity } from "../AuthoredEntity";


@EventSubscriber()
export class AuthoredEntitySubscriber implements EntitySubscriberInterface<AuthoredEntity> {
    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return AuthoredEntity
    }

    /**
     * Called before post insertion.
     */
    beforeUpdate(event: UpdateEvent<AuthoredEntity>) {
        console.log('Authored Subscriber');
        const session = event.queryRunner.data.session as Session;

        if (!session) {
            throw new Error(`You must be authenticated to save items!`);
        }

        const authUserId = session.user.id;

        // Check if the authenticated user is the same as the user who created the entity.
        if (!authUserId || authUserId !== event.databaseEntity.user.id) {
            throw new Error(`Only the original designer may edit this item.`);
        }

        // Check if User has been modified. Authored items should not be modified by other users.
        if (event.entity && event.entity.user.id !== event.databaseEntity.user.id) {
            throw new Error(`Authored items should only be modified by the original designer.`);
        }
    }
}
