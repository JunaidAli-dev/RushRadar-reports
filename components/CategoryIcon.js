import React from 'react'

const CategoryIcon = (category) => {
        switch (category) {
        case "Police":
            return "🚔"; // Police Car Emoji
        case "Medical":
            return "🏥"; // Hospital Emoji
        case "Fire":
            return "🔥"; // Fire Emoji
        default:
            return "❓"; // Unknown
    }
}

export default CategoryIcon
