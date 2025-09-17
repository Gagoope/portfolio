import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Request, User } from '../types';
import axios from 'axios';

interface RequestContextType {
  requests: Request[];
  createRequest: (request: Omit<Request, 'id' | 'requestedAt' | 'status'>) => Promise<void>;
  updateRequestStatus: (id: string, status: Request['status'], approval?: any) => Promise<void>;
  getRequestsByUser: (userId: string) => Request[];
  getRequestsByStatus: (status: Request['status']) => Request[];
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get<Request[]>('http://localhost:4000/api/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const createRequest = async (requestData: Omit<Request, 'id' | 'requestedAt' | 'status'>) => {
    try {
      const response = await axios.post<Request>('http://localhost:4000/api/requests', requestData);
      setRequests(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Failed to create request:', error);
    }
  };

  const updateRequestStatus = async (id: string, status: Request['status'], approval?: any) => {
    // This is a placeholder for backend integration of status update
    setRequests(prev => prev.map(request => {
      if (request.id === id) {
        const updated = { ...request, status };
        if (approval) {
          if (status === 'accounts-review' || status === 'hod-review') {
            updated.accountsApproval = approval;
          } else if (status === 'approved') {
            updated.hodApproval = approval;
          }
        }
        return updated;
      }
      return request;
    }));
  };

  const getRequestsByUser = (userId: string) => {
    return requests.filter(request => request.requestedBy.id === userId);
  };

  const getRequestsByStatus = (status: Request['status']) => {
    return requests.filter(request => request.status === status);
  };

  return (
    <RequestContext.Provider value={{
      requests,
      createRequest,
      updateRequestStatus,
      getRequestsByUser,
      getRequestsByStatus,
    }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
}
