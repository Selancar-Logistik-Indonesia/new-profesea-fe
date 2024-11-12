import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
    action: Actions
    subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
    console.log(subject)
    const { can, rules } = new AbilityBuilder(AppAbility)
    if (role === 'admin') {
        can('manage', [
            'home',
            'admin-accounts',
            'admin-job-management',
            'admin-company-and-job-management',
            'admin-training-management',
            'admin-subcription-management',
            'admin-ads-management',
            'admin-community-management',
            'admin-master-data',
            'master/job-categories',
            'master/licensi',
            'master/licensi-coc',
            'master/licensi-cop',
            'master/training-categories',
            'master/role-level',
            'master/role-type',
            'master/vessel-type',
            'master/forum',
            'master/event-register',
            'master/sekolah',
            'feed-detail',
            'admin-list-eventregister',
            'admin-master-news',
            'admin-master-event',
            'admin-list-alumni',
            'admin-feeds-management'
        ])
    } else if (role === 'Seafarer') {
        can(['read'], ['home', 'user-community', 'profile-company', 'company-activities', 'user-alumni', 'seafarer-training', 'seafarer', 'seafarer-jobs', 'feed-detail', 'candidate/profile', 'seafarer-job-applied', 'PricingPage', 'select-type', 'on-boarding'])
    } else if (role === 'Company') {
        can(['read'], ['home', 'company', 'profile-company', 'company-activities', 'user-community', 'user-job-management', 'user-find-candidate', 'user-job-detail', 'find-candidate', 'feed-detail', 'company-job-applied', 'PricingPage', 'select-type', 'on-boarding']);
    } else if (role === 'Trainer') {
        can(['read'], ['home', 'user-community', 'profile-company', 'company-activities', 'user-training-management', 'feed-detail', 'user-my-participant', 'select-type', 'on-boarding']);
    } else {
        can(['read'], ['home', 'job-detail', 'seafarer-jobs', 'profile-company', 'company-activities', 'select-type']);
    }

    return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
    return new AppAbility(defineRulesFor(role, subject), {
        // https://casl.js.org/v5/en/guide/subject-type-detection
        // @ts-ignore
        detectSubjectType: object => object!.type
    });
}

export const defaultACLObj: ACLObj = {
    action: 'manage',
    subject: 'all'
}

export default defineRulesFor
