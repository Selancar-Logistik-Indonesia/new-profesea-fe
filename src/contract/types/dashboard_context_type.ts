type DashboardContextType = {
    onLoading: boolean,
    dataOnship: any[],
    dataOffship: any[],
    dataTotalUser: any[],
    statOfCandidateOff: () => Promise<void>,
    statOfCandidateOn: () => Promise<void>,
    statOfUserByRole: () => Promise<void>,
}

export default DashboardContextType;