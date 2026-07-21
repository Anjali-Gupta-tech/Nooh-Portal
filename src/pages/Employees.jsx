import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { employeeService } from "../services/employeeService";
import { PageHeader } from "../components/PageHeader";
import { Loader } from "../components/Loader";
import { EmptyState } from "../components/EmptyState";
import { UserCheck, Phone, Mail, Calendar, ChevronRight, Briefcase } from "lucide-react";

export function Employees() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [list, depts] = await Promise.all([
          employeeService.getEmployees(),
          employeeService.getDepartments()
        ]);
        setEmployees(list);
        setDepartments(depts);
      } catch (err) {
        console.error("Error loading employee listings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    if (selectedDept === "All") return true;
    return emp.department === selectedDept;
  });

  if (loading) {
    return <Loader label="Retrieving firm directory..." />;
  }

  return (
    <div className="space-y-6" id="employees-page-root">
      <PageHeader
        title="Office & Project Directory"
        description="Verify firm departments, technical designations, and contact registrations."
      />

      {/* Department filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100 shrink-0" id="employees-department-bar">
        <button
          onClick={() => setSelectedDept("All")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
            selectedDept === "All"
              ? "bg-[#C9A227] text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
          }`}
        >
          All Departments
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              selectedDept === dept
                ? "bg-[#C9A227] text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Employee Cards Grid */}
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" id="employees-grid">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => navigate(`/employees/${emp.id}`)}
              className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between h-80 group"
            >
              <div className="space-y-4">
                {/* Photo & Role Card Header */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-150">
                    <img
                      src={emp.photo}
                      alt={emp.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">{emp.id}</span>
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-[#C9A227] transition-colors truncate">
                      {emp.name}
                    </h3>
                    <p className="text-[10px] text-[#C9A227] uppercase tracking-wider font-bold truncate mt-0.5">
                      {emp.designation}
                    </p>
                  </div>
                </div>

                {/* Contacts & Metadata info */}
                <div className="space-y-2.5 pt-4 border-t border-slate-50 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Department: {emp.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{emp.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#C9A227] group-hover:underline">
                <span>View Full Profile</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Empty Department"
          description={`No personnel are active in "${selectedDept}" department.`}
          icon={UserCheck}
        />
      )}
    </div>
  );
}
