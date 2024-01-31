using Microsoft.EntityFrameworkCore;
using ReactProjectCRUD.Models;

namespace ReactProjectCRUD.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=ReactProjectCRUD;Trusted_Connection=true;TrustServerCertificate=true");
        }

        public DbSet<Project> projects { get; set; }
    }
}
