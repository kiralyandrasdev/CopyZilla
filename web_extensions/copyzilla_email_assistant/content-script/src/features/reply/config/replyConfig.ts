import { ReplyToneModel } from "../components/mood/ReplyTone";
import { ReplyTypeItem } from "../components/response_type/ReplyType";

export const AvailableTypes: ReplyTypeItem[] = [
    {
        title: 'Mondj igent 👍',
        value: 'yes',
    },
    {
        title: 'Mondj nemet 👎',
        value: 'no',
    },
    {
        title: 'Tudomásul vesz 👌',
        value: 'acknowledge',
    },
    /*         {
            title: 'Ask a question ❓',
        }, */
    {
        title: 'Mondj köszönetet 🙏',
        value: 'thanks',
    },
]

export const AvailableTones: ReplyToneModel[] = [
    {
        title: 'Semleges 😊',
        value: 'neutral',
    },
    {
        title: 'Izgatott 😃',
        value: 'excited',
    },
    {
        title: 'Mérges 😡',
        value: 'angry',
    },
    {
        title: 'Összezavart 😕',
        value: 'confused',
    },
    {
        title: 'Stresszes 😰',
        value: 'stressed',
    }
]
