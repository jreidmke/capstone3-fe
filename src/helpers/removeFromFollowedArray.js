function removeFromFollowedArray(allTags, followedTags) {
    for(let i = 0; i < allTags.length; i++) {
        for(let tag of followedTags) {
            if(allTags[i].id === tag.tag_id) {
                console.log(allTags[i].id === tag.tag_id)
                allTags.splice(i, 1);
            }
        }
    };
    return allTags;
}

export default removeFromFollowedArray;