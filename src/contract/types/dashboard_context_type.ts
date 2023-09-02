type DashboardContextType = {
    onLoading: boolean,
    dataOnship: any[],
    dataOffship: any[],
    dataTotalUser: any[],
    dataTopCompany: any[],
    dataTopCommunity: any[],
    dataTopTraining: any[],
    statOfCandidateOff: () => Promise<void>,
    statOfCandidateOn: () => Promise<void>,
    statOfUserByRole: () => Promise<void>,
    statTopList: (payload: {contribType: string, segment?:any}) => Promise<void>,
}

export default DashboardContextType;