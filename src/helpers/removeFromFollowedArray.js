function removeFromFollowedArray(allTags, followedTags) {
    for(let i = 0; i < allTags.length; i++) {
        for(let tag of followedTags) {
            if(allTags[i].id === tag.tagId) {
                allTags.splice(i, 1);
            }
        }
    };
    return allTags;
}

export default removeFromFollowedArray;