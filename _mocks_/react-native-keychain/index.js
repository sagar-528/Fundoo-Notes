const keyChainMock = {
    SECURITY_LEVEL_ANY : "MOCK_SECURITY_LEVEL_ANY",
    SECURITY_LEVEL_SECURE_HARDWARE : "MOCK_SECURITY_LEVEL_SECURE_HARDWARE",
    SECURITY_LEVEL_SECURE_SOFTWARE : "MOCK_SECURITY_LEVEL_SECURE_SOFTWARE",
    setGenericPassword : jest.fn().mockResolvedValue(),
    getGenericPassword : jest.fn().mockResolvedValue(),
    resetGenericPassword : jest.fn().mockResolvedValue(),
}

export default keyChainMock;