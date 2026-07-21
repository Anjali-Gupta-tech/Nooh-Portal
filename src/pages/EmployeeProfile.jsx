import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { employeeService } from "../services/employeeService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { Breadcrumb } from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";
import { ArrowLeft, Phone, Mail, Calendar, Briefcase } from "lucide-react";

export function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await employeeService.getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        addToast("Personnel profile not found", "error");
        navigate("/employees");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, navigate]);

  if (loading) {
    return <Loader label="Retrieving secure credentials..." />;
  }

  const breadcrumbs = [
    { label: "Personnel Registry", path: "/employees" },
    { label: employee.name }
  ];

  return (
    <div className="space-y-6" id="employee-profile-root">
      {/* Back and Breadcrumbs */}
      <div className="flex flex-col gap-2 shrink-0">
        <Link
          to="/employees"
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors width-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Personnel list</span>
        </Link>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Core Avatar & Contact Details */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs text-center space-y-4">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 mx-auto border border-slate-150">
              <img
                src={employee.photo}
                alt={employee.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold font-mono uppercase">ID: {employee.id}</span>
              <h1 className="text-lg font-bold text-slate-800 mt-0.5">
                {employee.name}
              </h1>
              <p className="text-xs text-[#C9A227] font-bold uppercase tracking-wider mt-1">
                {employee.designation}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-50 text-xs font-semibold text-slate-500 space-y-3.5 text-left">
              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-700">{employee.department}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Primary Department</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-700">{employee.phone}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Mobile Contact</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-700 truncate">{employee.email}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Portal Email</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-700">{employee.joiningDate}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Joining Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Bio, Skills, Milestones */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Bio & Overview */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Personnel biography & Profile
              </h2>
              <p className="text-xs text-slate-500">
                Brief details about role responsibilities.
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {employee.bio || `${employee.name} operates as the primary ${employee.designation} at NOOH Living, ensuring that clients receive high precision design layouts and complete material quality support on site.`}
            </p>

            {/* Skill sets list */}
            <div className="space-y-2.5 pt-4 border-t border-slate-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Acreedited Skill Sets
              </h3>
              
              <div className="flex flex-wrap gap-1.5" id="profile-skills">
                {employee.skills ? (
                  employee.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 text-[11px] font-bold"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 text-[11px] font-bold">Client Relations</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 text-[11px] font-bold">CAD Layout plans</span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 text-[11px] font-bold">Material logistics</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Activity milestone stream */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recent Portal Activity Logs
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div className="flex gap-3">
                <div className="p-1 bg-green-100 text-green-700 rounded h-fit text-[9px] uppercase font-bold tracking-wide">COMPLETED</div>
                <div className="space-y-0.5">
                  <p className="text-slate-800">Assigned Site Inspection Logs Approved</p>
                  <p className="text-[11px] text-slate-400 font-medium">Updated execution stage metrics and cleared structural ceiling audits.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-1 bg-[#C9A227]/10 text-[#C9A227] rounded h-fit text-[9px] uppercase font-bold tracking-wide">IN PROGRESS</div>
                <div className="space-y-0.5">
                  <p className="text-slate-800">Quarterly Performance Evaluation</p>
                  <p className="text-[11px] text-slate-400 font-medium">Undergoing review process under executive department guidelines.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
