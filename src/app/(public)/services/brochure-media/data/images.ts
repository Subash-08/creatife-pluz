export const STUDIO_IMAGES = [
    "https://framerusercontent.com/images/xLQO3TgWWsETZmGQmfwzFHPp8.png",
    "https://framerusercontent.com/images/su1rgwb8QbzQoPYsoBQDZdMEheg.png",
    "https://framerusercontent.com/images/HIlB4LGzuDvszAX9Zj5JpG1E7A.png",
    "https://framerusercontent.com/images/xUX5UArtB0Tt1SzYx6ZrgvyjeiQ.png",
    "https://framerusercontent.com/images/aW7nCctmsKDALQAlRdjLnPlEbc0.png",
    "https://framerusercontent.com/images/KzEHCcEHlbJJbwL20tfiK0iro.png",
    "https://framerusercontent.com/images/YolYUu3IxHfsmijVegYSaiJMvfo.png",
    "https://framerusercontent.com/images/dF5b1on96S9bR7ZU6AZHt0s.png",
    "https://framerusercontent.com/images/q8qKuN2rjMEVaM7WICNWlsGw.png",
    "https://framerusercontent.com/images/vGUvYBEc5hyKzq6XgQQuAhiO1Zo.png",
    "https://framerusercontent.com/images/edndreXKSyQ4ykciYYzpEACHtA.png",
    "https://framerusercontent.com/images/zERweaOj4OiBcnXVNMcV3ZX9X44.png",
    "https://framerusercontent.com/images/MQcZkde08g0XNMjMu0fEWCdbOw8.png",
    "https://framerusercontent.com/images/WwiHhMwM7YDTLkpzHgPgm75d9o.png",
    "https://framerusercontent.com/images/n0KmPKjil8AHYCPRS7lft2N6mFo.png"
];

// Helper to shuffle array for randomness in rows
export const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};