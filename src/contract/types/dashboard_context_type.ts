type DashboardContextType = {
    onLoading: boolean,
    dataOnship: any[],
    dataOffship: any[],
    dataTotalUser: any[],
    dataTopCompany: any[],
    dataTopCommunity: any[],
    dataTopTraining: any[],
    dataChartSubs: any,
    totalUsers: number,
    totalSeafarer: number,
    totalSeafarerVerified: number,
    totalProfessional: number,
    totalProfessionalVerified: number,
    totalCompany: number,
    totalCompanyVerified: number,
    totalTrainer: number,
    totalTrainerVerified: number,
    statOfCandidateOff: () => Promise<void>,
    statOfCandidateOn: () => Promise<void>,
    statOfUserByRole: () => Promise<void>,
    statTopList: (payload: { contribType: string, segment?: any }) => Promise<void>,
    chartSubscriptions: (payload: { data_type: string, range?: any }) => Promise<void>,
    userOverview: () => Promise<void>
}

export default DashboardContextType;