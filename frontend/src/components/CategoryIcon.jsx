import { BookAudio, Brain, BookHeart, Languages, Mic2, Scale, ScrollText } from "lucide-react"

const CATEGORY_STYLES = {
  Fiqh: { icon: Scale, color: "#c8b808" },
  Aqeedah: { icon: Brain, color: "#54b003" },
  Quran: { icon: BookHeart, color: "#059669" },
  Tafsir: { icon: BookHeart, color: "#23592f" },
  Arabic: { icon: Languages, color: "#EA580C" },
  Hadith: { icon: ScrollText, color: "#475569" },
  Sermon: { icon: Mic2, color: "#DC2626" },
  Default: { icon: BookAudio, color: "#26a2dc" },
};

// export function getIcon(course_category = "Default"){
//     const {icon, color} = CATEGORY_STYLES[course_category]
//     return [icon, color]
// }

const CategoryIcon = ({category="Default"}) => {

    // Check if category exists, otherwise use the 'Default' object
    const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Default;

    const {icon: Icon, color} = style;
    // console.log(icon)
    return (
        <Icon color={color}/>
    )
}


export default CategoryIcon;