type DashboardContextType = {
    onLoading: boolean,
    dataOnship: any[],
    dataOffship: any[],
    dataTotalUser: any[],
    dataTopCompany: any[],
    dataTopCommunity: any[],
    dataTopTraining: any[],
    dataChartSubs: any,
    statOfCandidateOff: () => Promise<void>,
    statOfCandidateOn: () => Promise<void>,
    statOfUserByRole: () => Promise<void>,
    statTopList: (payload: {contribType: string, segment?:any}) => Promise<void>,
    chartSubscriptions: (payload: {data_type: string, range?:any}) => Promise<void>,
}

export default DashboardContextType;