export const RESTAURANT_MICROSERVICE = {
    name: 'RESTAURANT_SERVICE',
    commands: {
        list:"list_restaurant",      
        findBulk:"find_bulk_restaurant", 
        create:"create_restaurant",
        find: "find_restaurant",
        update: "update_restaurant",
        delete: "delete_restaurant"
    },
    host: "localhost",
    port: 3002
}