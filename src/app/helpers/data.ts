import { Activity } from '../interfaces/Activities';

export const activities: Activity[] = [
    {
        activityId: 1,
        title: 'Subida al cerro catedral',
        type: 'ACTIVITY',
        startDate: new Date('2023-05-16 01:30:00'),
        endDate: new Date('2023-05-16 23:30:00'),
        status: 'IN_PROGRESS',
    },
    {
        activityId: 2,
        title: 'Fiesta de espuma',
        type: 'PARTY',
        startDate: new Date('2023-05-17 01:30:00'),
        endDate: new Date('2023-05-17 23:30:00'),
        status: 'DONE',
    },
    {
        activityId: 3,
        title: 'Desayuno',
        type: 'FOOD',
        startDate: null,
        endDate: null,
        status: null,
    },
    {
        activityId: 4,
        title: 'Patagonia',
        type: 'ACTIVITY',
        startDate: null,
        endDate: null,
        status: null,
    },
    {
        activityId: 5,
        title: 'Almuerzo',
        type: 'FOOD',
        startDate: new Date('2023-05-18 13:30:00'),
        endDate: new Date('2023-05-18 14:30:00'),
        status: 'DONE',
    },
    {
        activityId: 6,
        title: 'Circuito chico',
        type: 'ACTIVITY',
        startDate: null,
        endDate: null,
        status: null,
    },
    {
        activityId: 7,
        title: 'Desayuno',
        type: 'FOOD',
        startDate: new Date('2023-05-16 08:30:00'),
        endDate: new Date('2023-05-16 10:00:00'),
        status: 'IN_PROGRESS',
    },
    {
        activityId: 8,
        title: 'Snowpark',
        type: 'ACTIVITY',
        startDate: new Date('2023-05-16 13:00:00'),
        endDate: new Date('2023-05-16 16:00:00'),
        status: null,
    },
    {
        activityId: 9,
        title: 'Merienda',
        type: 'FOOD',
        startDate: new Date('2023-05-16 17:00:00'),
        endDate: new Date('2023-05-16 18:30:00'),
        status: null,
    },
    {
        activityId: 10,
        title: 'Desayuno',
        type: 'FOOD',
        startDate: new Date('2023-05-17 08:30:00'),
        endDate: new Date('2023-05-17 10:00:00'),
        status: null,
    },
    {
        activityId: 11,
        title: 'Desayuno',
        type: 'FOOD',
        startDate: new Date('2023-05-18 08:30:00'),
        endDate: new Date('2023-05-18 10:00:00'),
        status: null,
    },
];
