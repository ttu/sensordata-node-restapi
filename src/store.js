function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

class Store {
    async get(){
        // Simulate long processing time
        await timeout(1000);
        return { 'name' : 'timmy '};
    }
}

export default Store;