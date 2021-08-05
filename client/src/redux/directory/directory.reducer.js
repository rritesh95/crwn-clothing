//it's a good practice to move state data to redux  even if it's not changing frequently
//through reducer, also it helps in reusability incase need arise to use at multiple components, 
//in that way it is making code more modular which will help in writing test cases
//which will be easy to execute.

const INITIAL_STATE = {
    sections : [
        {
            title: 'hats',
            // imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
            imageUrl: 'images/hats.png', // local file in public/images/
            id: 1,
            linkUrl: 'shop/hats'
    
        },
        {
            title: 'jackets',
            // imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
            imageUrl: 'images/jackets.png', // local file in public/images/
            id: 2,
            linkUrl: 'shop/jackets'
        },
        {
            title: 'sneakers',
            // imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
            imageUrl: 'images/sneakers.png', // local file in public/images/
            id: 3,
            linkUrl: 'shop/sneakers'
        },
        {
            title: 'womens',
            // imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
            imageUrl: 'images/womens.png', // local file in public/images/
            size: 'large',
            id: 4,
            linkUrl: 'shop/womens'
        },
        {
            title: 'mens',
            // imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
            imageUrl: 'images/men.png', // local file in public/images/
            size: 'large',
            id: 5,
            linkUrl: 'shop/mens'
        }
    ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        default :
            return state;
    }
}

export default directoryReducer;