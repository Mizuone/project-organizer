using System.ComponentModel.DataAnnotations;

namespace ReactProjectCRUD.Models
{
    public class Project
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; } = DateTime.Now.AddDays(30);
    }
}
