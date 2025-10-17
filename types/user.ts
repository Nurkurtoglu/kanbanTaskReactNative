import { ImageSourcePropType } from 'react-native';

export interface User {
    id: string;
    name: string;
    surname?: string;
    email?: string;
    avatar?: ImageSourcePropType;
}