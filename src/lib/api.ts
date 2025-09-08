const API_BASE_URL = import.meta.env.VITE_API_URL;;

// API Response type
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

// API Error class
export class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: any[]) {
    super(message);
    this.name = 'ApiError';
  }
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Base fetch function with error handling
const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData.errors
      );
    }

    const data = await response.json();
    console.log("--data--",data);
    
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error or server unavailable');
  }
};

// Authentication API
export const authApi = {
  register: async (userData: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    jobTitle?: string;
    workLocation?: string;
  }) => {
    return apiFetch<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  verifyOtp: async (email: string, otp: string) => {
    return apiFetch<{ user: any; message: string; isFirstTime: boolean; token?: string }>('/auth/verifyEmail', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  },

  login: async (email: string, password?: string, otp?: string) => {
    // For OTP-based login, first request OTP
    if (!otp) {
      return apiFetch<{ message: string }>('/auth/sendEmail', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    }
    // Then verify with OTP
    return apiFetch<{ userInfo: any; message: string; isFirstTime: boolean; token?: string }>('/auth/verifyEmail', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  },

  requestOtp: async (email: string) => {
    return apiFetch<{ message: string }>('/auth/sendEmail', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  getMe: async () => {
    return apiFetch<{ userDetails: any }>('/auth/me');
  },

  refreshToken: async () => {
    return apiFetch<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  },

  logout: async () => {
    return apiFetch('/auth/logout', {
      method: 'POST',
    });
  },
};

// Employees API
export const employeesApi = {
  getAllEmployees: async (type: string = 'employee') => {
    return apiFetch<{
      allEmployeeList: any[];
      message: string;
    }>(`/admin/getAllEmployees?type=${type}`);
  },

  getAll: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    isActive?: boolean;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return apiFetch<{
      employees: any[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    }>(`/employees?${searchParams}`);
  },

  getById: async (id: string) => {
    return apiFetch<{ employee: any }>(`/employees/${id}`);
  },

  addNewEmployee: async (employeeData: FormData | {
    employeeName: string;
    email: string;
    phoneNumber?: string;
    jobTitle?: string;
    workLocation?: string;
    profileImage?: File;
    dateOfJoining?: string;
    role?: string;
  }) => {
    let formData: FormData;
    
    if (employeeData instanceof FormData) {
      formData = employeeData;
    } else {
      formData = new FormData();
      formData.append('employeeName', employeeData.employeeName);
      formData.append('email', employeeData.email);
      if (employeeData.phoneNumber) formData.append('phoneNumber', employeeData.phoneNumber);
      if (employeeData.jobTitle) formData.append('jobTitle', employeeData.jobTitle);
      if (employeeData.workLocation) formData.append('workLocation', employeeData.workLocation);
      if (employeeData.profileImage) formData.append('profileImage', employeeData.profileImage);
      if (employeeData.dateOfJoining) formData.append('dateOfJoining', employeeData.dateOfJoining);
      if (employeeData.role) formData.append('role', employeeData.role);
    }

    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/admin/addNewEmployee`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    console.log("--response-",response);
    

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'Failed to add employee', errorData.errors);
    }

    return response.json();
  },

  create: async (employeeData: {
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
    address?: string;
    jobTitle?: string;
    workLocation?: string;
  }) => {
    return apiFetch<{ employee: any }>('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData),
    });
  },

  update: async (id: string, eventData: {
    latitude?: number;
    longitude?: number;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    invitees?: string[];
    hrs?: string[];
    eventName?: string;
  }) => {
    return apiFetch<{ event: any }>(`/event/updateEventById/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(eventData),
    });
  },

  uploadProfileImage: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    return apiFetch<{ employee: any; imageUrl: string }>(`/employees/${id}/profile-image`, {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  },

  delete: async (id: string) => {
    return apiFetch(`/admin/deleteEmployeeById/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return apiFetch<{
      totalEmployees: number;
      activeEmployees: number;
      inactiveEmployees: number;
      roleDistribution: Record<string, number>;
    }>('/employees/stats/overview');
  },
};

// Events API
export const eventsApi = {
  getAllMyEvents: async () => {
    return apiFetch<{
      allMyEvents: any[];
      message: string;
    }>('/admin/getAllMyEvents');
  },

  getAll: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    return apiFetch<{
      events: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/event${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string) => {
    return apiFetch<any>(`/event/getEventById/${id}`);
  },

  getAllTrendingEvents: async () => {
    return apiFetch<{
      userEvents: Array<{
        id: number;
        location: string;
        eventBanner: string;
        userId: string;
        startDate: string;
        endDate: string;
        eventName: string;
        hrs: string[];
        eventStatus: string;
      }>;
      events: Array<{
        id: number;
        location: string;
        eventBanner: string;
        userId: string;
        startDate: string;
        endDate: string;
        eventName: string;
        hrs: string[];
        eventStatus: string;
      }>;
      message: string;
    }>('/event/getAllTrendingEvents/');
  },

  addNewEvent: async (eventData: {
    eventName: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    latitude: string;
    longitude: string;
    invitees?: string[];
    hrs?: string[];
    inviteesAndHrsPdf?: Array<{ id: string; pdf: string }>;
    eventBannerImage?: File;
    contractPdf?: File;
    individualContracts?: File[];
  }) => {
    const formData = new FormData();
    formData.append('eventName', eventData.eventName);
    formData.append('description', eventData.description);
    formData.append('startDate', eventData.startDate);
    formData.append('endDate', eventData.endDate);
    formData.append('location', eventData.location);
    formData.append('latitude', eventData.latitude);
    formData.append('longitude', eventData.longitude);
    
    if (eventData.invitees) {
      formData.append('invitees', JSON.stringify(eventData.invitees));
    }
    if (eventData.hrs) {
      formData.append('hrs', JSON.stringify(eventData.hrs));
    }
    if (eventData.inviteesAndHrsPdf) {
      formData.append('inviteesAndHrsPdf', JSON.stringify(eventData.inviteesAndHrsPdf));
    }
    
    // File uploads
    if (eventData.eventBannerImage) {
      formData.append('eventBannerImage', eventData.eventBannerImage);
    }
    if (eventData.contractPdf) {
      formData.append('contractPdf', eventData.contractPdf);
    }
    if (eventData.individualContracts) {
      eventData.individualContracts.forEach((file) => {
        formData.append('individualcontract', file);
      });
    }
    
    // For FormData, we need to let the browser set Content-Type automatically
    // but preserve the Authorization header that apiFetch adds
    const token = localStorage.getItem('authToken');
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return apiFetch('/event/addNewEvent', {
      method: 'POST',
      body: formData,
      headers, // Only include Authorization header, let browser set Content-Type for FormData
    });
  },

  create: async (eventData: {
    eventName: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    latitude: number;
    longitude: number;
    invitees?: string[];
    hrs?: string[];
  }) => {
    const formData = new FormData();
    formData.append('eventName', eventData.eventName);
    formData.append('description', eventData.description);
    formData.append('startDate', eventData.startDate);
    formData.append('endDate', eventData.endDate);
    formData.append('location', eventData.location);
    formData.append('latitude', eventData.latitude.toString());
    formData.append('longitude', eventData.longitude.toString());
    
    if (eventData.invitees) {
      formData.append('invitees', JSON.stringify(eventData.invitees));
    }
    if (eventData.hrs) {
      formData.append('hrs', JSON.stringify(eventData.hrs));
    }
    
    return apiFetch('/event', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  },

  update: async (id: string, eventData: any) => {
    return apiFetch(`/event/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  delete: async (id: string) => {
    return apiFetch(`/event/${id}`, {
      method: 'DELETE',
    });
  },

  addInvitees: async (id: string, userIds: string[]) => {
    return apiFetch(`/event/${id}/invitees`, {
      method: 'POST',
      body: JSON.stringify({ userIds }),
    });
  },
};

// Invitations API
export const invitationsApi = {
  getAllMyInvitations: async () => {
    return apiFetch<{
      message: string;
      allMyInvitations: Array<{
        id: number;
        employeeId: string;
        userId: string;
        eventId: number;
        contractPdf: string;
        individualcontractpdf: string | null;
        fileName: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        event: {
          id: number;
          eventName: string;
          contractPdf: string;
          eventBanner: string;
          startDate: string;
          endDate: string;
          location: string;
          description: string;
          latitude: number;
          longitude: number;
          invitees: string[];
          hrs: string[];
          userId: string;
        };
      }>;
    }>('/invitation/getAllMyInvitations');
  },

  getAllMyInvitationAcceptedContracts: async () => {
    return apiFetch<{
      allMyContracts: Array<{
        id: number;
        eventId: number;
        employeeId: string;
        status: string;
        contractPdf: string;
        event: {
          id: number;
          eventName: string;
          startDate: string;
          endDate: string;
          location: string;
        };
      }>;
    }>('/invitation/getAllMyInvitationAcceptedContracts/');
  },

  acceptOrRejectInvitation: async (invitationId: number, isAccepted: boolean) => {
    return apiFetch<{
      message: string;
      success: boolean;
    }>('/invitation/acceptOrRejectInvitation', {
      method: 'POST',
      body: JSON.stringify({
        invitationId: invitationId.toString(),
        isAccepted
      }),
    });
  },

  getAll: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return apiFetch<{
      invitations: any[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    }>(`/invitations?${searchParams}`);
  },

  respond: async (eventId: string, status: 'accepted' | 'declined') => {
    return apiFetch('/invitations/respond', {
      method: 'POST',
      body: JSON.stringify({ eventId, status }),
    });
  },

  send: async (eventId: string, userIds: string[], message?: string) => {
    return apiFetch('/invitations/send', {
      method: 'POST',
      body: JSON.stringify({ eventId, userIds, message }),
    });
  },

  getStats: async (eventId: string) => {
    return apiFetch<{
      eventId: string;
      stats: {
        totalInvited: number;
        accepted: number;
        declined: number;
        pending: number;
      };
      invitees: any[];
    }>(`/invitations/stats/${eventId}`);
  },

  resend: async (eventId: string, userId: string) => {
    return apiFetch('/invitations/resend', {
      method: 'POST',
      body: JSON.stringify({ eventId, userId }),
    });
  },
};

// Attendance API
export const attendanceApi = {
  punchIn: async (eventId: string, location: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    accuracy?: number;
  }) => {
    return apiFetch<{
      attendance: any;
      locationValidation: {
        isValid: boolean;
        distance: number;
        error?: string;
      };
    }>('/attendance/punch-in', {
      method: 'POST',
      body: JSON.stringify({
        eventId,
        location,
        deviceInfo: {
          userAgent: navigator.userAgent,
          deviceId: localStorage.getItem('deviceId') || 'unknown',
        },
      }),
    });
  },

  punchOut: async (eventId: string, location?: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }, notes?: string) => {
    return apiFetch<{
      attendance: any;
      duration: number;
    }>('/attendance/punch-out', {
      method: 'POST',
      body: JSON.stringify({ eventId, location, notes }),
    });
  },

  getEventLogs: async (eventId: string) => {
    return apiFetch<{
      event: any;
      summary: {
        totalInvited: number;
        totalAttended: number;
        attendanceRate: string;
        onTime: number;
        late: number;
        validLocation: number;
        invalidLocation: number;
      };
      attendanceRecords: any[];
      absentUsers: any[];
    }>(`/attendance/event/${eventId}`);
  },

  getMyHistory: async (params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return apiFetch<{
      attendanceRecords: any[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    }>(`/attendance/my-history?${searchParams}`);
  },

  update: async (attendanceId: string, data: {
    status?: string;
    notes?: string;
    isValid?: boolean;
  }) => {
    return apiFetch<{ attendance: any }>(`/attendance/${attendanceId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Contracts API
export const contractsApi = {
  getAll: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    return apiFetch<{
      contracts: any[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    }>(`/contracts?${searchParams}`);
  },

  getByEventId: async (eventId: string) => {
    return apiFetch<{
      contract: any;
      isExpired: boolean;
      userHasSigned: boolean;
    }>(`/contracts/${eventId}`);
  },

  upload: async (eventId: string, file: File, data: {
    title: string;
    description?: string;
    expiryDate?: string;
  }) => {
    const formData = new FormData();
    formData.append('contract', file);
    formData.append('eventId', eventId);
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.expiryDate) formData.append('expiryDate', data.expiryDate);
    
    return apiFetch<{ contract: any }>('/contracts/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type for FormData
    });
  },

  download: async (eventId: string) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/contracts/${eventId}/download`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to download contract');
    }
    
    return response.blob();
  },

  sign: async (eventId: string, signature: string) => {
    return apiFetch('/contracts/' + eventId + '/sign', {
      method: 'POST',
      body: JSON.stringify({ signature }),
    });
  },

  updateStatus: async (contractId: string, status: string) => {
    return apiFetch<{ contract: any }>(`/contracts/${contractId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  delete: async (contractId: string) => {
    return apiFetch(`/contracts/${contractId}`, {
      method: 'DELETE',
    });
  },
};

// Reports API
export const reportsApi = {
  exportEvent: async (eventId: string) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/reports/${eventId}/export`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to export report');
    }
    
    return response.blob();
  },

  getSummary: async (eventId: string) => {
    return apiFetch<{
      event: any;
      stats: {
        totalInvited: number;
        totalAttended: number;
        attendanceRate: string;
        onTime: number;
        late: number;
        validLocation: number;
        invalidLocation: number;
      };
      attendanceRecords: any[];
      absentUsers: any[];
      contract: any;
    }>(`/reports/${eventId}/summary`);
  },
};

// Utility functions
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const getCurrentLocation = (): Promise<{
  latitude: number;
  longitude: number;
  accuracy: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};

// About Content API
export const aboutContentApi = {
  // Get all about content (public)
  getAboutContent: async () => {
    return apiFetch<{
      aboutContent?: any[];
      aboutPage?: any;
      message: string;
    }>('/about-content');
  },

  // Get specific section content (admin)
  getSectionContent: async (sectionType: string) => {
    return apiFetch<{
      section: any;
      message: string;
    }>(`/admin/about-content/${sectionType}`);
  },

  // Update Hero Section
  updateHeroSection: async (data: {
    subtitle: string;
    mainTitle: string;
    description: string;
    buttonText: string;
    heroBackgroundImage?: File;
  }) => {
    const formData = new FormData();
    formData.append('subtitle', data.subtitle);
    formData.append('mainTitle', data.mainTitle);
    formData.append('description', data.description);
    formData.append('buttonText', data.buttonText);
    
    if (data.heroBackgroundImage) {
      formData.append('heroBackgroundImage', data.heroBackgroundImage);
    }

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/about-content/hero`, {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'lang': 'en'
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'Failed to update hero section', errorData.errors);
    }

    return response.json();
  },

  // Update Features Section
  updateFeaturesSection: async (data: {
    features: Array<{
      featureTitle: string;
      featureDescription: string;
    }>;
    sectionImage?: File;
    featureIcons?: File[];
  }) => {
    const formData = new FormData();
    
    // Add features data
    data.features.forEach((feature, index) => {
      formData.append(`features[${index}][featureTitle]`, feature.featureTitle);
      formData.append(`features[${index}][featureDescription]`, feature.featureDescription);
    });

    if (data.sectionImage) {
      formData.append('sectionImage', data.sectionImage);
    }

    if (data.featureIcons) {
      data.featureIcons.forEach((icon) => {
        formData.append('featureIcon', icon);
      });
    }

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/about-content/features`, {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'lang': 'en'
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'Failed to update features section', errorData.errors);
    }

    return response.json();
  },

  // Update Mission Section
  updateMissionSection: async (data: {
    missionTitle: string;
    missionDescription: string;
    missionIcon?: File;
  }) => {
    const formData = new FormData();
    formData.append('missionTitle', data.missionTitle);
    formData.append('missionDescription', data.missionDescription);
    
    if (data.missionIcon) {
      formData.append('missionIcon', data.missionIcon);
    }

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/about-content/mission`, {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'lang': 'en'
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'Failed to update mission section', errorData.errors);
    }

    return response.json();
  },

  // Update Vision Section
  updateVisionSection: async (data: {
    visionTitle: string;
    visionDescription: string;
    visionIcon?: File;
  }) => {
    const formData = new FormData();
    formData.append('visionTitle', data.visionTitle);
    formData.append('visionDescription', data.visionDescription);
    
    if (data.visionIcon) {
      formData.append('visionIcon', data.visionIcon);
    }

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/about-content/vision`, {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'lang': 'en'
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'Failed to update vision section', errorData.errors);
    }

    return response.json();
  },

  // Update Objectives Section
  updateObjectivesSection: async (data: {
    objectivesTitle: string;
    objectives: Array<{
      objectiveText: string;
    }>;
    objectivesIcon?: File;
  }) => {
    const formData = new FormData();
    formData.append('objectivesTitle', data.objectivesTitle);
    
    // Add objectives data
    data.objectives.forEach((objective, index) => {
      formData.append(`objectives[${index}][objectiveText]`, objective.objectiveText);
    });
    
    if (data.objectivesIcon) {
      formData.append('objectivesIcon', data.objectivesIcon);
    }

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/admin/about-content/objectives`, {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'lang': 'en'
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'Failed to update objectives section', errorData.errors);
    }

    return response.json();
  },
};

// Admin API
export const adminApi = {
  getDashboardData: async () => {
    return apiFetch<{
      dashBoardData: {
        totalEmployees: number;
        activeEmployees: number;
        ongoingEvents: number;
        completedEvents: number;
        recentActiveEvents: Array<{
          id: number;
          eventName: string;
          location: string;
          invitees: any;
          description: string;
          eventBanner: string | null;
          contractPdf: string | null;
          userId: string;
          dateAndTime: string;
          createdAt: string;
          updatedAt: string;
        }>;
        employeesList: Array<{
          id: string;
          fullName: string;
          email: string;
          phoneNumber: string;
          profileImageUrl: string;
          jobTitle: string;
          workLocation: string;
          dateOfJoining: string;
          role: string;
          otp: any;
          isverified: boolean;
          isActive: boolean;
          createdAt: string;
          updatedAt: string;
        }>;
      };
    }>('/admin/fetchTheAdminDashboardData/');
  },
};
