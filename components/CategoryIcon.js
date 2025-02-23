const CategoryIcon = (category) => {
        switch (category) {
        case "Police":
            return "🚔"; // Police Car Emoji
        case "Medical":
            return "🏥"; // Hospital Emoji
        case "Fire":
            return "🔥"; // Fire Emoji
        case "Towing":
            return "🆘";
        case "Electric":
            return "💡";
        case "Construction":
            return "🚧";
        default:
            return "❓"; // Unknown
    }
}

export default CategoryIcon
