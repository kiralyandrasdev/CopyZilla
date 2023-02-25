import { ReplyToneModel } from "../components/mood/ReplyTone";
import { ReplyTypeItem } from "../components/response_type/ReplyType";

export const AvailableTypes: ReplyTypeItem[] = [
    {
        title: 'Say yes 👍',
        value: 'yes',
    },
    {
        title: 'Say no 👎',
        value: 'no',
    },
    {
        title: 'Acknowledge 👌',
        value: 'acknowledge',
    },
    /*         {
            title: 'Ask a question ❓',
        }, */
    {
        title: 'Say thanks 🙏',
        value: 'thanks',
    },
]

export const AvailableTones: ReplyToneModel[] = [
    {
        title: 'Neutral 😊',
        value: 'neutral',
    },
    {
        title: 'Excited 😃',
        value: 'excited',
    },
    {
        title: 'Angry 😡',
        value: 'angry',
    },
    {
        title: 'Confused 😕',
        value: 'confused',
    },
    {
        title: 'Stressed 😰',
        value: 'stressed',
    }
]
