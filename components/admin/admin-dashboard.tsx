'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Users,
  Briefcase,
  MonitorSmartphone,
  Globe,
  MoreHorizontal,
  RefreshCw,
  Download,
  X,
  Search,
  Filter,
  Eye,
  Trash2,
  MessageSquare,
  Calendar,
  Smartphone,
  Building,
  BarChart3,
  TrendingUp,
  UserCheck,
  Clock
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'
import { Progress } from '@/components/ui/progress'

// --- 1. FULL SCHEMA MATCHING PRISMA ---
interface Lead {
  id: number
  name: string
  role?: string | null
  company?: string | null
  organizationSize?: string | null
  message?: string | null
  phone: string
  email?: string | null
  status: string
  source?: string | null
  sessionId?: string | null
  landingPage?: string | null
  screenSize?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  referrer?: string | null
  metadata?: any // JSON type
  createdAt: string | Date
  updatedAt?: string | Date
}

interface DashboardAnalytics {
  totalLeads: number
  topRole: string
  topSource: string
  mobilePercentage: number
  recentLeads: Lead[]
  roleDistribution: Record<string, number>
  statusDistribution: Record<string, number>
  dailyLeads: number
  conversionRate: number
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [roleFilter, setRoleFilter] = useState('ALL')

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/dashboard')
      if (!response.ok) throw new Error('Failed to fetch')
      const result = await response.json()
      setData(result)
      toast.success('Dashboard updated')
    } catch (error) {
      console.error(error)
      setData(getMockData())
      toast.error('Using mock data - Check API connection')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filter leads based on search and filters
  const filteredLeads = data?.recentLeads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.message?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter
    const matchesRole = roleFilter === 'ALL' || lead.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  }) || []

  // --- HELPERS ---
  const getRoleBadge = (role: string | null | undefined) => {
    if (!role) return <Badge variant="outline" className="bg-gray-50">N/A</Badge>
    const styles: Record<string, string> = {
      DOCTOR: 'bg-blue-50 text-blue-700 border-blue-200',
      CLINIC_OWNER: 'bg-purple-50 text-purple-700 border-purple-200',
      HOSPITAL_ADMIN: 'bg-red-50 text-red-700 border-red-200',
      MEDICAL_STUDENT: 'bg-green-50 text-green-700 border-green-200',
      PHARMACIST: 'bg-orange-50 text-orange-700 border-orange-200',
      NURSE: 'bg-pink-50 text-pink-700 border-pink-200',
    }
    return (
      <Badge variant="outline" className={`${styles[role] || 'bg-gray-50'} text-xs font-medium px-2 py-0.5`}>
        {role.replace(/_/g, ' ')}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string, text: string }> = {
      NEW: { bg: 'bg-blue-100', text: 'text-blue-800' },
      CONTACTED: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      QUALIFIED: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
      CONVERTED: { bg: 'bg-green-100', text: 'text-green-800' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800' },
    }
    const style = styles[status] || { bg: 'bg-gray-100', text: 'text-gray-800' }
    return (
      <Badge className={`${style.bg} ${style.text} border-none font-medium`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5 opacity-70"></span>
        {status}
      </Badge>
    )
  }

  const truncateText = (text: string | null | undefined, length: number = 60): string => {
    if (!text) return ''
    return text.length > length ? text.substring(0, length) + '...' : text
  }

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center flex-col gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
        <div className="text-center space-y-2">
          <p className="text-gray-700 font-medium">Loading Dashboard</p>
          <p className="text-sm text-gray-500">Fetching lead analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) return (
    <div className="p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <X className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load dashboard</h3>
      <p className="text-gray-500 mb-4">Please check your API connection</p>
      <Button onClick={fetchData}>Try Again</Button>
    </div>
  )

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-50">
              <BarChart3 className="h-6 w-6 text-cyan-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lead Intelligence Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Monitor landing page performance and validate your idea with real lead data
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads by name, email, phone, or message..."
                className="pl-10 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                  <SelectItem value="QUALIFIED">Qualified</SelectItem>
                  <SelectItem value="CONVERTED">Converted</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  <SelectItem value="DOCTOR">Doctor</SelectItem>
                  <SelectItem value="CLINIC_OWNER">Clinic Owner</SelectItem>
                  <SelectItem value="HOSPITAL_ADMIN">Hospital Admin</SelectItem>
                  <SelectItem value="MEDICAL_STUDENT">Medical Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchData} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* --- KEY METRICS --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Leads" 
          value={data.totalLeads.toString()} 
          change="+12.5%"
          icon={Users}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
          description="All captured leads"
        />
        <MetricCard 
          title="Daily Leads" 
          value={data.dailyLeads} 
          change="+3 today"
          icon={TrendingUp}
          iconColor="text-green-600"
          bgColor="bg-green-50"
          description="Leads captured today"
        />
        <MetricCard 
          title="Top Role" 
          value={data.topRole.replace(/_/g, ' ')} 
          change="Most engaged"
          icon={UserCheck}
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
          description="Highest converting segment"
        />
        <MetricCard 
          title="Mobile Traffic" 
          value={`${data.mobilePercentage}%`} 
          change="Majority"
          icon={Smartphone}
          iconColor="text-orange-600"
          bgColor="bg-orange-50"
          description="Mobile vs Desktop"
        />
      </div>

      {/* --- CONVERSION INSIGHTS --- */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Role Distribution */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-500" />
              Role Distribution
            </CardTitle>
            <CardDescription>Breakdown by professional role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.roleDistribution).map(([role, count]) => (
                <div key={role} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{role.replace(/_/g, ' ')}</span>
                    <span className="text-gray-500">{count} leads ({Math.round((count / data.totalLeads) * 100)}%)</span>
                  </div>
                  <Progress value={(count / data.totalLeads) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              Lead Status
            </CardTitle>
            <CardDescription>Current pipeline stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.statusDistribution || { NEW: 40, CONTACTED: 30, CONVERTED: 20, REJECTED: 10 }).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${
                      status === 'NEW' ? 'bg-blue-500' :
                      status === 'CONTACTED' ? 'bg-yellow-500' :
                      status === 'CONVERTED' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium">{status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{count}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round((count / data.totalLeads) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Sources */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-500" />
              Top Sources
            </CardTitle>
            <CardDescription>Where leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white">
                    <span className="font-bold text-blue-600">FB</span>
                  </div>
                  <div>
                    <p className="font-medium">Facebook Ads</p>
                    <p className="text-xs text-gray-500">Campaign: Winter Promo</p>
                  </div>
                </div>
                <span className="font-bold text-lg">42%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white">
                    <span className="font-bold text-green-600">GG</span>
                  </div>
                  <div>
                    <p className="font-medium">Google Search</p>
                    <p className="text-xs text-gray-500">Organic traffic</p>
                  </div>
                </div>
                <span className="font-bold text-lg">28%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white">
                    <span className="font-bold text-purple-600">LI</span>
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-xs text-gray-500">Professional network</p>
                  </div>
                </div>
                <span className="font-bold text-lg">18%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- LEAD TABLE WITH MESSAGES --- */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Recent Leads</CardTitle>
              <CardDescription>
                Showing {filteredLeads.length} of {data.recentLeads.length} leads
                {searchTerm && ` • Searching: "${searchTerm}"`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Last 30 days</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[180px]">Contact</TableHead>
                  <TableHead>Role / Company</TableHead>
                  <TableHead className="w-[280px]">Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No leads found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-50/80 border-b border-gray-100">
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-700 font-medium text-sm">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 block">{lead.name}</span>
                              <span className="text-xs text-gray-500">{lead.phone}</span>
                            </div>
                          </div>
                          {lead.email && (
                            <span className="text-xs text-gray-400 truncate mt-1">{lead.email}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getRoleBadge(lead.role)}
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Building className="h-3 w-3" />
                            {lead.company || 'Not specified'}
                          </div>
                          {lead.organizationSize && (
                            <span className="text-[11px] text-gray-400 font-medium">
                              {lead.organizationSize.replace(/_/g, ' ')}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.message ? (
                          <div 
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md">
                              <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {truncateText(lead.message, 80)}
                              </p>
                            </div>
                            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600">Click to view full</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">No message</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getStatusBadge(lead.status)}
                          <span className="text-xs text-gray-400">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{lead.utmSource || 'Direct'}</span>
                          <span className="text-xs text-gray-400">{lead.utmMedium || 'Organic'}</span>
                          <span className="text-[10px] text-gray-400 truncate" title={lead.utmCampaign || ''}>
                            {lead.utmCampaign || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedLead(lead)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" /> Send Follow-up
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Lead
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- LEAD DETAILS MODAL --- */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-xl shadow-xl animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-semibold">
                    {selectedLead.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedLead.name}</h2>
                  <p className="text-sm text-gray-500">
                    Lead #{selectedLead.id} • {selectedLead.role ? selectedLead.role.replace(/_/g, ' ') : 'Unknown Role'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedLead.status)}
                <Button variant="ghost" size="icon" onClick={() => setSelectedLead(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              
              {/* Contact & Professional Info */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="h-4 w-4" /> Contact Information
                  </h3>
                  <div className="space-y-3">
                    <DetailField label="Full Name" value={selectedLead.name} />
                    <DetailField label="Phone Number" value={selectedLead.phone} type="phone" />
                    <DetailField label="Email Address" value={selectedLead.email} type="email" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Professional Details
                  </h3>
                  <div className="space-y-3">
                    <DetailField label="Professional Role" value={selectedLead.role} badge />
                    <DetailField label="Organization" value={selectedLead.company} />
                    <DetailField label="Organization Size" value={selectedLead.organizationSize?.replace(/_/g, ' ')} />
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Lead Message
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line">{selectedLead.message}</p>
                  </div>
                </div>
              )}

              {/* Analytics & Technical */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Acquisition Data
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <DetailCard label="Source" value={selectedLead.utmSource || 'Direct'} color="blue" />
                    <DetailCard label="Medium" value={selectedLead.utmMedium || 'Organic'} color="purple" />
                    <DetailCard label="Campaign" value={selectedLead.utmCampaign || 'N/A'} color="orange" />
                    <DetailCard label="Landing Page" value={selectedLead.landingPage || 'N/A'} color="green" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Technical Details
                  </h3>
                  <div className="space-y-3">
                    <DetailField label="Device" value={selectedLead.screenSize?.includes('iPhone') ? 'Mobile' : 'Desktop'} />
                    <DetailField label="Screen Size" value={selectedLead.screenSize} />
                    <DetailField label="IP Address" value={selectedLead.ipAddress} />
                    <DetailField label="Session ID" value={selectedLead.sessionId} truncate />
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Timeline
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>Created</span>
                  </div>
                  <span className="font-medium">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </span>
                </div>
                {selectedLead.updatedAt && (
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Last Updated</span>
                    </div>
                    <span className="font-medium">
                      {new Date(selectedLead.updatedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 border-t bg-gray-50 px-6 py-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Lead captured via {selectedLead.source || 'Unknown Source'}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedLead(null)}>Close</Button>
                <Button>Follow Up</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- SUB-COMPONENTS ---

function MetricCard({ title, value, change, icon: Icon, iconColor, bgColor, description }: any) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {change && (
                <span className={`text-sm font-medium ${
                  change.includes('+') ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {change}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailField({ label, value, type = 'text', badge = false, truncate = false }: any) {
  if (!value) return null
  
  if (badge) {
    return (
      <div>
        <span className="text-xs font-semibold text-gray-500 block mb-1">{label}</span>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {value.replace(/_/g, ' ')}
        </Badge>
      </div>
    )
  }

  return (
    <div>
      <span className="text-xs font-semibold text-gray-500 block mb-1">{label}</span>
      <span className={`text-sm text-gray-900 ${truncate ? 'truncate block' : ''}`} title={value}>
        {type === 'email' ? (
          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">{value}</a>
        ) : type === 'phone' ? (
          <a href={`tel:${value}`} className="text-blue-600 hover:underline">{value}</a>
        ) : (
          value
        )}
      </span>
    </div>
  )
}

function DetailCard({ label, value, color = 'gray' }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100',
    purple: 'bg-purple-50 border-purple-100',
    orange: 'bg-orange-50 border-orange-100',
    green: 'bg-green-50 border-green-100',
    gray: 'bg-gray-50 border-gray-100'
  }

  return (
    <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
      <span className="text-xs font-semibold text-gray-500 block">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  )
}

// --- MOCK DATA GENERATOR ---
function getMockData(): DashboardAnalytics {
  const mockLeads: Lead[] = [
    { 
      id: 1, 
      name: 'Dr. Ahmed Rahman', 
      role: 'DOCTOR', 
      company: 'Sylhet Medical Center',
      organizationSize: 'MEDIUM_11_50',
      phone: '+8801711000000', 
      email: 'ahmed.rahman@sylhetmed.com', 
      status: 'NEW', 
      message: 'Very interested in your platform for managing patient records. Currently using manual systems that are inefficient. Looking for a solution for my 2 clinics with 15 staff members total.',
      utmSource: 'facebook',
      utmMedium: 'cpc',
      utmCampaign: 'winter_promo_2024',
      ipAddress: '103.100.20.1',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
      screenSize: '390x844',
      source: 'Facebook Ads',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      role: 'CLINIC_OWNER', 
      company: 'Prime Dental Care',
      organizationSize: 'SMALL_2_10',
      phone: '+8801911223344', 
      email: 'sarah@primedental.com', 
      status: 'CONTACTED', 
      message: 'Need appointment scheduling system for dental clinic with 3 dentists and 2 hygienists. Tried other solutions but too complicated for our staff.',
      utmSource: 'google',
      utmMedium: 'organic',
      utmCampaign: null,
      ipAddress: '103.150.30.5',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      screenSize: '1920x1080',
      source: 'Google Search',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString()
    },
    { 
      id: 3, 
      name: 'Dr. Fatima Khan', 
      role: 'HOSPITAL_ADMIN', 
      company: 'City General Hospital',
      organizationSize: 'LARGE_51_200',
      phone: '+8801811556677', 
      email: 'fatima.khan@cityhospital.org', 
      status: 'QUALIFIED', 
      message: 'Evaluating your platform for hospital-wide implementation. Need integration with existing EHR system and support for 200+ users.',
      utmSource: 'linkedin',
      utmMedium: 'social',
      utmCampaign: 'enterprise_q1',
      ipAddress: '103.200.40.10',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      screenSize: '1440x900',
      source: 'LinkedIn',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]

  return {
    totalLeads: 156,
    topRole: 'DOCTOR',
    topSource: 'Facebook',
    mobilePercentage: 68,
    dailyLeads: 12,
    conversionRate: 28,
    recentLeads: mockLeads,
    roleDistribution: { 
      'DOCTOR': 65, 
      'CLINIC_OWNER': 42, 
      'HOSPITAL_ADMIN': 28, 
      'MEDICAL_STUDENT': 15,
      'PHARMACIST': 6
    },
    statusDistribution: { 
      'NEW': 48, 
      'CONTACTED': 56, 
      'QUALIFIED': 32, 
      'CONVERTED': 14,
      'REJECTED': 6
    }
  } as DashboardAnalytics
}